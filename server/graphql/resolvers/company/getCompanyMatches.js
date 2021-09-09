const { errorLogger } = require('../../../helpers');
const { getCompanyMatchesError } = require('./constants');

const getCompanyMatches = async () => {
  try {
    const result = [
      {
        position: 'Fullstack Engineer',
        candidates: [],
      },
      {
        position: 'Junior Frontend Engineer',
        candidates: [
          {
            firstName: 'Jane',
            isHired: false,
            isInterviewRequested: false,
            isSaved: true,
            languages: ['JavaScript', 'Python', 'Java'],
            lastName: 'Doe',
            lastPosition: 'Software Engineer at Apple',
            location: 'San Francisco, CA',
            percentMatch: 80,
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/9b156bc2-5ec1-4865-a51a-8a25d0e158b0',
            salary: '$110,000',
            type: 'full-time',
            yearsOfExperience: '2-5 years',
          },
        ],
      },
      {
        position: 'Senior Backend Engineer',
        candidates: [],
      },
    ];
    return {
      __typename: 'CompanyMatchesArray',
      companyMatchesArray: result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getCompanyMatchesError,
    };
  }
};

module.exports = getCompanyMatches;
