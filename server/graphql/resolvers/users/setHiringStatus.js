// const { createUserError } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const { answerQuestionByKey } = require('../../../db');

const setHiringStatus = async ({ hiringStatus }, { authError, userId }) => {
  if (authError || !userId) throw new CustomError(authError);
  try {
    // Hiring status is set to 'active', 'inactive', 'undeclared'
    // We use this to determine whether the user has ever indicated
    // interest in the hiring platform
    const enrolled = hiringStatus === 'active';

    // TODO: update this once we migrate to the the true/false hiring question
    await answerQuestionByKey({
      questionKey: 'timeline',
      responseKey: enrolled ? '0_months' : 'indefinite',
      userId,
    });
    return {
      __typename: 'Success',
      message: 'Updated hiring status',
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: 'Failed to update hiring status',
    };
  }
};

module.exports = setHiringStatus;
