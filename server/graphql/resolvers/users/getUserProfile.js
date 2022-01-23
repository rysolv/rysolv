const { CustomError, errorLogger } = require('../../../helpers');
const {
  getQuestionAnswerByKey,
  getTopLanguages,
  getUserByUsername,
  getWeeklyCommits,
} = require('../../../db');
const { oneUserError } = require('./constants');

const getUserProfile = async ({ username }) => {
  try {
    const user = await getUserByUsername({ username });
    if (!user) throw new CustomError(`Not found`);

    // Get hiring status
    const responseKey = await getQuestionAnswerByKey({
      userId: user.id,
      questionKey: 'is_active',
    });
    if (responseKey && responseKey === 'yes_is_active') {
      user.hiringStatus = 'active';
    } else if (responseKey === 'no_is_active') {
      user.hiringStatus = 'inactive';
    } else {
      user.hiringStatus = 'undeclared';
    }

    // Get weekly commits
    const weeklyCommits = await getWeeklyCommits({ userId: '123' });
    const weeks = [];
    const cumulative = [];
    weeklyCommits.forEach(({ week, commits }) => {
      weeks.push(week);
      cumulative.push(commits);
    });

    // Get top languages
    const languageByCommits = await getTopLanguages({ userId: '123' });

    user.chartData = {
      commits: { labels: weeks, data: cumulative },
      languageByCommits,
      githubStats: {
        commits: 1301,
        contributedTo: 3,
        pullRequests: 88,
        stars: 44,
      },
    };

    user.desiredRole = ['Dev-Ops', 'Machine Learning', 'Back-end'];
    user.title = 'Senior engineer at Rysolv';
    user.location = 'San Francisco, CA, USA';
    user.about =
      "Hey I'm tyler and I do cool dev stuff. Founded rysolv.com, a crowdfunding platform for open-source development. Worked for Kumanu for a while";

    user.topLanguages = languageByCommits;

    user.skills = [
      { name: 'JavaScript', level: 3 },
      { name: 'React', level: 3 },
      { name: 'Python', level: 2 },
      { name: 'TypeScript', level: 2 },
      { name: 'Go', level: 1 },
    ];

    return {
      __typename: 'User',
      ...user,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || oneUserError,
    };
  }
};

module.exports = getUserProfile;
