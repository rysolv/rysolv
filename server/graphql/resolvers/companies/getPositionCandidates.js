const { CustomError, errorLogger } = require('../../../helpers');
const {
  getPositionCandidates: getPositionCandidatesQuery,
} = require('../../../db');

const getPositionCandidates = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const candidates = await getPositionCandidatesQuery({ positionId });
    return {
      __typename: 'PositionCandidatesArray',
      candidates,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'PositionCandidatesArray',
      candidates: [],
    };
  }
};

module.exports = getPositionCandidates;
