/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
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

    // TODO: query all this stuff
    const mock = {
      languages: ['JavaScript', 'Python', 'Java'],
      location: 'San Francisco, CA',
      type: 'full-time',
    };
    const candidates = await getPositionCandidatesQuery({ positionId, saved });

    // Format Candidates object
    const result = candidates.reduce((acc, el) => {
      const { userQuestions } = el;
      const { target_salary, type, experience, is_active } = userQuestions;

      if (is_active === 'Yes') {
        acc.push({
          ...el,
          ...mock,
          salary: target_salary,
          type,
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
