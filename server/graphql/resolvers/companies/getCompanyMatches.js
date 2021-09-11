const { errorLogger } = require('../../../helpers');

const getCompanyMatches = async () => {
  try {
    const result = [
      {
        candidates: [],
        position: {
          id: '',
          location: 'remote',
          title: 'Fullstack Engineer',
        },
      },
      {
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
        position: {
          id: '',
          location: 'remote',
          title: 'Junior Frontend Engineer',
        },
      },
      {
        candidates: [],
        position: {
          id: '',
          location: 'remote',
          title: 'Senior Backend Engineer',
        },
      },
    ];
    return {
      __typename: 'CompanyMatchesArray',
      companyMatchesArray: result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'CompanyMatchesArray',
      companyMatchesArray: [],
    };
  }
};

module.exports = getCompanyMatches;
