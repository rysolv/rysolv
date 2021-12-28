const { answerQuestionByKey } = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const { setHiringStatusError, setHiringStatusSuccess } = require('./constants');

const setHiringStatus = async ({ hiringStatus }, { authError, userId }) => {
  if (authError || !userId) throw new CustomError(authError);
  try {
    // Hiring status is set to 'active', 'inactive', 'undeclared'
    // We use this to determine whether the user has ever indicated
    // interest in the hiring platform
    const isActive = hiringStatus === 'active';

    await answerQuestionByKey({
      category: 'hiring',
      questionKey: 'is_active',
      responseKey: isActive ? 'yes_is_active' : 'no_is_active',
      userId,
      value: isActive ? 'Yes' : 'No',
    });
    return {
      __typename: 'Success',
      message: setHiringStatusSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: setHiringStatusError,
    };
  }
};

module.exports = setHiringStatus;
