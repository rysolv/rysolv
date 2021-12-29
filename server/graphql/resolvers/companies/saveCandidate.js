const { CustomError, errorLogger } = require('../../../helpers');
const { saveCandidate: saveCandidateQuery } = require('../../../db');
const { saveCandidateError, saveCandidateSuccess } = require('./constants');

const saveCandidate = async (
  { candidateId, positionId },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await saveCandidateQuery({ candidateId, positionId });

    return {
      __typename: 'Success',
      message: saveCandidateSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: saveCandidateError,
    };
  }
};

module.exports = saveCandidate;
