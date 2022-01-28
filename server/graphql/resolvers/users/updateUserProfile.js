const { errorLogger } = require('../../../helpers');
const {
  getTopLanguages,
  getWeeklyCommits,
  updateUserProfile: updateProfileQuery,
} = require('../../../db');
const { updateProfileError, updateProfileSuccess } = require('./constants');

const updateUserProfile = async ({ userId }) => {
  try {
    const userProfile = { userId };

    // Get weekly commits
    const weeklyCommits = await getWeeklyCommits({ userId });
    const weeks = [];
    const cumulative = [];
    weeklyCommits.forEach(({ week, commits }) => {
      weeks.push(week);
      cumulative.push(commits);
    });

    // Get top languages
    const languageByCommits = await getTopLanguages({ userId });

    // Create ChartData Object
    const chartData = {
      commits: { labels: weeks, data: cumulative },
      languageByCommits,
    };

    // Fetch Github Data
    chartData.githubStats = {
      averageCommit: 844,
      commits: 1301,
      contributedTo: 3,
      pullRequests: 88,
      stars: 44,
    };
    chartData.repoStats = [
      {
        contributors: 8,
        description:
          'A crowdfunding platform where users can sponsor outstanding issues in open source projects and earn bounties by resolving them.',
        githubLink: 'https://github.com/rysolv/rysolv',
        pullRequests: 161,
        repoName: 'rysolv/rysolv',
        stars: 52,
      },
      {
        contributors: 15,
        description: 'The Noisebridge Infrastucture',
        githubLink: 'https://github.com/noisebridge/infrastructure',
        pullRequests: 216,
        repoName: 'noisebridge/infrastructure',
        stars: 20,
      },
    ];
    chartData.pullRequestStats = [
      {
        additions: 337,
        comments: 8,
        deletions: 342,
        githubLink: 'https://github.com/rysolv/rysolv/pull/186',
        repoName: 'rysolv/rysolv',
        title: 'Hotfix: auth infinite spinning fix',
      },
    ];

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
