const { errorLogger } = require('../../../helpers');
const { forgotCognitoPassword } = require('../../../middlewares/awsConfig');
const { sendLinkError, sendLinkSuccess } = require('./constants');

const sendLink = async ({ email }) => {
  try {
    await forgotCognitoPassword({ email });

    return {
      __typename: 'Success',
      message: sendLinkSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: sendLinkError,
    };
  }
};

module.exports = sendLink;
