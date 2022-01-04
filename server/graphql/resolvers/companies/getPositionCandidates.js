/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { matchLanguages } = require('../../../helpers');
const {
  getPositionCandidates: getPositionCandidatesQuery,
} = require('../../../db');

// Get all candidates for a position
// If saved==true, only select the shortlisted candidates
const getPositionCandidates = async (
  { positionId, saved },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const candidates = await getPositionCandidatesQuery({ positionId, saved });

    // Format Candidates object
    const result = candidates.reduce((acc, el) => {
      const { userQuestions, userLanguages, positionLanguages } = el;
      const { target_salary, experience, is_active } = userQuestions;

      if (is_active === 'Yes') {
        acc.push({
          ...el,
          languages: matchLanguages({ userLanguages, positionLanguages }),
          location: 'San Francisco, CA',
          salary: target_salary,
          type: 'full-time',
          yearsOfExperience: experience,
        });
      }
      return acc;
    }, []);

    return result;
  } catch (error) {
    errorLogger(error);
    return {
      candidates: [],
    };
  }
};

module.exports = getPositionCandidates;
