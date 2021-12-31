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
      isHired: false,
      isInterviewRequested: false,
      languages: ['JavaScript', 'Python', 'Java'],
      lastPosition: 'Lead Software Engineer at Rysolv',
      location: 'San Francisco, CA',
      salary: '$180,000',
      type: 'full-time',
      yearsOfExperience: '2-5 years',
    };
    const candidates = await getPositionCandidatesQuery({ positionId, saved });

    const result = candidates.map(el => ({ ...el, ...mock }));

    return result;
  } catch (error) {
    errorLogger(error);
    return {
      candidates: [],
    };
  }
};

module.exports = getPositionCandidates;
