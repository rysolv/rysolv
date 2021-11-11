const { CustomError, errorLogger } = require('../../../helpers');
const { getUserByUsername, getQuestionAnswerByKey } = require('../../../db');
const { oneUserError } = require('./constants');

const getUserProfile = async ({ username }) => {
  try {
    const user = await getUserByUsername({ username });
    if (!user) throw new CustomError(`Not found`);

    // Get hiring status
    const responseKey = await getQuestionAnswerByKey({
      userId: user.id,
      questionKey: 'timeline',
    });
    if (responseKey && responseKey === '0_months') {
      user.hiringStatus = 'active';
    }

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
