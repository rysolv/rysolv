const { errorLogger } = require('../../../helpers');
const {
  getCommitStats,
  getGitUser,
  getTopLanguages,
  updateUserProfile: updateProfileQuery,
} = require('../../../db');

const { getUserStats } = require('../../../integrations');

const { updateProfileError, updateProfileSuccess } = require('./constants');

const updateUserProfile = async ({ userId }) => {
  try {
    const userProfile = { userId };

    // Get git user
    const { githubToken, githubUsername } = await getGitUser({
      userId,
    });

    // Get monthly commits
    const {
      averageLines,
      commits,
      contributedTo,
      totalCommits,
      months,
    } = await getCommitStats({ userId });

    // Get top languages
    const languageByCommits = await getTopLanguages({ userId });

    // Create ChartData Object
    const chartData = {
      commits: { labels: months, data: commits },
      languageByCommits,
    };

    // Get user repos
    // TODO: Use GQL api for repos / PRs. Better data.
    // Also, look for PR events, not comments
    const { pullRequests, repos, pullRequestCount } = await getUserStats({
      username: githubUsername,
      userToken: githubToken,
    });

    const pullRequestStats = pullRequests.map(el => {
      const repoName = el.repository_url.split('/repos/')[1];
      return {
        additions: 0,
        comments: el.comments,
        deletions: 0,
        githubLink: el.html_url,
        repoName,
        title: el.title,
      };
    });

    let totalStars = 0;
    const repoStats = repos.map(el => {
      totalStars += el.stargazers_count;
      return {
        contributors: 0,
        description: el.description,
        githubLink: el.html_url,
        pullRequests: 0,
        repoName: el.full_name,
        stars: el.stargazers_count,
      };
    });

    repoStats.sort((a, b) => {
      if (a.stars < b.stars) return 1;
      if (a.stars > b.stars) return -1;
      return 0;
    });

    chartData.repoStats = repoStats.slice(0, 3);
    chartData.pullRequestStats = pullRequestStats.slice(0, 3);

    // Fetch Github Data
    chartData.githubStats = {
      averageCommit: averageLines,
      commits: totalCommits,
      contributedTo,
      pullRequests: pullRequestCount,
      stars: totalStars,
    };

    userProfile.chartData = chartData;

    // Insert into user_profile table
    await updateProfileQuery({ userProfile });

    return {
      __typename: 'Success',
      message: updateProfileSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: updateProfileError,
    };
  }
};

module.exports = updateUserProfile;
