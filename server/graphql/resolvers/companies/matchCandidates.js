/* eslint-disable no-unused-expressions */
const { CustomError, errorLogger } = require('../../../helpers');
const {
  getAllCandidates,
  getOnePosition,
  matchCandidates: matchCandidatesQuery,
} = require('../../../db');
const { matchCandidatesError, matchCandidatesSuccess } = require('./constants');
const { matchCandidate } = require('../helpers');

/**
 * Match Candidates to Positions:
 * -- get question/answers for all active users
 * -- get question/answers for position
 * -- insert matching users into candidate_positions table
 *
 * Matching Criteria:
 * -- location & timezone                    Required
 * -- experience                             Required
 * -- position type (fulltime / contractor)  Required
 * -- languages                              40%
 * -- frameworks                             20%
 * -- roles (front-end, backend, etc.)       20%
 * -- salary                                 20%
 */

const matchCandidatesToPosition = async (
  { positionId },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const t1 = new Date();

    // Get position details
    const {
      location: reqLocation,
      positionKeys,
      roleKeys: reqRoles,
      skills: reqLanguages,
    } = await getOnePosition({
      positionId,
    });

    const {
      experience: reqExperience,
      salary: reqSalary,
      timezone: reqTimezone,
      type: reqType,
    } = positionKeys;

    const position = {
      experience: reqExperience,
      location: reqLocation,
      positionKeys,
      roleKeys: reqRoles,
      salary: reqSalary,
      skills: reqLanguages,
      timezone: reqTimezone,
      type: reqType,
    };

    // Get all candidates
    const candidates = await getAllCandidates();

    const matchedCandidates = candidates.map(candidate => {
      const match = matchCandidate({ candidate, position });
      return match;
    });

    if (candidates.length) {
      await matchCandidatesQuery({ candidates: matchedCandidates, positionId });
    }

    // Allow time for the animation
    const t2 = new Date();
    const time = t2 - t1;
    const PromiseTimeout = delayms =>
      new Promise(resolve => {
        setTimeout(resolve, delayms);
      });
    if (time < 2000) await PromiseTimeout(2000 - time);

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

module.exports = matchCandidatesToPosition;
