const { CustomError, errorLogger } = require('../../../helpers');
const { getCandidateCount: getCandidateCountQuery } = require('../../../db');
const { noPositionIdError } = require('./constants');

const getCandidateCount = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    if (!positionId) throw new CustomError(noPositionIdError);

    const candidates = await getCandidateCountQuery({ positionId });

    const candidateCount = {};
    candidateCount.applied = candidates.filter(
      ({ hasApplied }) => hasApplied,
    ).length;
    candidateCount.recommended = candidates.length;
    candidateCount.saved = candidates.filter(({ isSaved }) => isSaved).length;

    return { candidateCount };
  } catch (error) {
    errorLogger(error);
    return { candidateCount: {} };
  }
};

module.exports = getCandidateCount;
