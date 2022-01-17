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
      questionKey: 'is_active',
    });
    if (responseKey && responseKey === 'yes_is_active') {
      user.hiringStatus = 'active';
    } else if (responseKey === 'no_is_active') {
      user.hiringStatus = 'inactive';
    } else {
      user.hiringStatus = 'undeclared';
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
