const { errorLogger } = require('../../../helpers');

const getCompanyMatches = async () => {
  try {
    const result = [
      {
        candidates: [],
        position: {
          id: '65bfee35-c96f-4870-949a-4c1af1244a26',
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
            userId: 'bc29844d-e616-43cf-8316-7a7458d2b101',
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
            userId: '48c98542-51a2-4659-9bea-e2819b7ff3b7',
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
            userId: '4439bb50-1916-4dab-9737-59ddae65436d',
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
            userId: 'c7dc4c56-2bc3-4c28-8936-9d254b433080',
            yearsOfExperience: '2-5 years',
          },
        ],
        position: {
          id: '365a09d3-b746-4fa9-897d-391be8cdcbcc',
          location: 'remote',
          title: 'Junior Frontend Engineer',
        },
      },
      {
        candidates: [],
        position: {
          id: '7a3bf8fe-f3ba-4814-af54-214bf2d8ac30',
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
