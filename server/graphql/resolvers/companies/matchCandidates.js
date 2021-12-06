const { CustomError, errorLogger } = require('../../../helpers');
const { matchCandidates: matchCandidatesQuery } = require('../../../db');
const { matchCandidatesError, matchCandidatesSuccess } = require('./constants');

const matchCandidates = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await matchCandidatesQuery({ positionId, userId });

    // TODO: remove timeout
    const PromiseTimeout = delayms =>
      new Promise(resolve => {
        setTimeout(resolve, delayms);
      });
    await PromiseTimeout(3000);

    return {
      __typename: 'Success',
      message: matchCandidatesSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || matchCandidatesError,
    };
  }
};

module.exports = matchCandidates;
