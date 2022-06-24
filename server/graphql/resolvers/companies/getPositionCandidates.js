/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { matchLanguages } = require('../../../helpers');
const {
  getPositionCandidates: getPositionCandidatesQuery,
  setCandidateViewedDate,
} = require('../../../db');

// Get all candidates for a position
// If saved==true, only select the shortlisted candidates
const getPositionCandidates = async (
  { positionId, step },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const candidates = await getPositionCandidatesQuery({ positionId, step });

    // Format Candidates object
    const result = candidates.reduce((acc, el) => {
      const {
        // contractKey,
        // paymentMethod,
        firstName,
        hasApplied,
        id,
        isSaved,
        lastName,
        location,
        matchCriteria,
        percentMatch,
        positionLanguages,
        profilePic,
        profilePicBlur,
        threadId,
        type,
        userLanguages,
        username,
        userQuestions,
      } = el;

      // TODO:
      // Temporarily removed the shouldBlur. This is just to prevent scraping candidates.
      // It will probably be added back later, but for now it's not a concern.
      // const shouldBlur = contractKey === 'startup' || !paymentMethod;
      const shouldBlur = false;

      const { target_salary, experience, is_active, resume } = userQuestions;

      if (is_active === 'Yes') {
        acc.push({
          firstName: shouldBlur
            ? `${firstName.charAt(0).toUpperCase()}.`
            : firstName,
          hasApplied,
          id,
          isSaved,
          languages: matchLanguages({ userLanguages, positionLanguages }),
          lastName: shouldBlur
            ? `${lastName.charAt(0).toUpperCase()}.`
            : lastName,
          location,
          matchCriteria,
          percentMatch,
          profilePic: shouldBlur ? profilePicBlur : profilePic,
          resume,
          salary: target_salary,
          threadId,
          type: type.length > 1 ? type.join(', ') : type[0],
          username,
          yearsOfExperience: experience,
        });
      }
      return acc;
    }, []);

    await setCandidateViewedDate({ positionId, step });

    return result;
  } catch (error) {
    errorLogger(error);
    return {
      candidates: [],
    };
  }
};

module.exports = getPositionCandidates;
