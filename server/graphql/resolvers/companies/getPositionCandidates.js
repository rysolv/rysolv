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
      const {
        contractKey,
        firstName,
        id,
        isSaved,
        lastName,
        paymentMethod,
        percentMatch,
        positionLanguages,
        profilePic,
        profilePicBlur,
        threadId,
        userLanguages,
        userQuestions,
      } = el;
      const shouldBlur = contractKey === 'startup' || !paymentMethod;

      const { target_salary, experience, is_active } = userQuestions;

      if (is_active === 'Yes') {
        acc.push({
          firstName: shouldBlur ? `${firstName.charAt(0)}.` : firstName,
          id,
          isSaved,
          languages: matchLanguages({ userLanguages, positionLanguages }),
          lastName: shouldBlur ? `${lastName.charAt(0)}.` : lastName,
          location: 'San Francisco, CA',
          percentMatch,
          profilePic: shouldBlur ? profilePicBlur : profilePic,
          salary: target_salary,
          threadId,
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
