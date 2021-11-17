const { getMessagesError } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const getMessages = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    console.log('Get Messages:');
    console.log(userId);

    const conversations = [
      {
        candidate: {
          firstName: 'Tyler',
          lastName: 'Maran',
          profilePic:
            'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
          userId: '12345',
          username: 'tylermaran',
        },
        position: {
          positionId: '12345',
          title: 'Full Stack Engineer',
          description:
            'Looking for a person who can develop both client and server software. In addition to mastering HTML and CSS',
        },
        company: {
          name: 'Rysolv',
          logo:
            'https://s3-eu-central-1.amazonaws.com/taledo-production-public/production/companies/company_logos/d6b/d3e/3f-/small/image.png?1631523412',
          description: 'Matching companies to engineers',
        },
        messages: [
          {
            body: 'Im available starting the 15th',
            createdDate: '2021-11-13T23:55:56.161Z',
            firstName: 'Tyler',
            lastName: 'Maran',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: '83930',
            username: 'tylermaran',
          },
          {
            body: 'When can you start?',
            createdDate: '2021-11-12T23:55:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
          {
            body: 'Sure! Im pretty good at coding stuff',
            createdDate: '2021-11-11T23:55:56.161Z',
            firstName: 'Tyler',
            lastName: 'Maran',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: '83930',
            username: 'tylermaran',
          },
          {
            body: 'Hey! Want a job?',
            createdDate: '2021-11-10T23:55:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
        ],
      },
      {
        candidate: {
          firstName: 'Anna',
          lastName: 'Pojawis',
          profilePic:
            'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/b7c1d4fc-2377-490e-8d46-79b6b6519d77',
          userId: '12345',
          username: 'annapo23',
        },
        position: {
          positionId: '12345',
          title: 'Front End Developer',
        },
        company: {
          name: 'Rysolv',
          logo: 'link',
          description: 'Matching companies to engineers',
        },
        messages: [
          {
            body:
              'I have 3 years of experience at DMI using React and React Native.',
            createdDate: '2021-10-13T13:55:56.161Z',
            firstName: 'Anna',
            lastName: 'Pojawis',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/b7c1d4fc-2377-490e-8d46-79b6b6519d77',
            userId: '83930',
            username: 'annapo23',
          },
          {
            body: 'Whats up?',
            createdDate: '2021-11-12T23:55:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
          {
            body: 'Oh hey boss man',
            createdDate: '2021-11-11T23:55:56.161Z',
            firstName: 'Anna',
            lastName: 'Pojawis',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/b7c1d4fc-2377-490e-8d46-79b6b6519d77',
            userId: '83930',
            username: 'annapo23',
          },
          {
            body: 'helloooo o',
            createdDate: '2021-11-10T23:55:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
          {
            body: 'Is this thing on?',
            createdDate: '2021-11-10T23:54:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
          {
            body: 'Testing 123',
            createdDate: '2021-11-10T23:53:56.161Z',
            firstName: 'Boss',
            lastName: 'Man',
            profilePic:
              'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/175a6000-5739-4d7a-aefa-b8594522d7fe',
            userId: 'aae80f28-6ce7-4714-9711-b6842c6d5dcf',
            username: 'bossman',
          },
        ],
      },
    ];

    return {
      __typename: 'ConversationArray',
      conversations,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getMessagesError,
    };
  }
};

module.exports = getMessages;
