const { CustomError, errorLogger } = require('../../../helpers');
const { getOneUser, getUserPullRequestDetail } = require('../../../db');
const { oneUserError } = require('./constants');

const oneUser = async ({ userId }) => {
  try {
    const { skills, ...userDetail } = await getOneUser({ userId });
    if (!userDetail) throw new CustomError(`Not found`);

    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });
    userDetail.activePullRequests = activePullRequests;
    userDetail.completedPullRequests = completedPullRequests;
    userDetail.rejectedPullRequests = rejectedPullRequests;

    const skillsArray = skills.map(({ name }) => name);
    userDetail.preferredLanguages = skillsArray;

    return {
      __typename: 'User',
      ...userDetail,
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

module.exports = oneUser;
