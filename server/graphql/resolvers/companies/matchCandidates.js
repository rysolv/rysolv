const { CustomError, errorLogger } = require('../../../helpers');
const { getCandidates, getOnePosition } = require('../../../db');
const { matchCandidatesError, matchCandidatesSuccess } = require('./constants');

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
const matchCandidates = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const position = await getOnePosition({ positionId });
    console.log(position);
    const candidates = await getCandidates();
    console.log(candidates);

    // Get position details
    // Get Candidate details

    // Check location

    // Check Experience

    // Check Languages

    // Check Frameworks

    // Check Roles

    // Check Position Type

    // Check Salary

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
