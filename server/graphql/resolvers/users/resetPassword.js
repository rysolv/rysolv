const { errorLogger } = require('../../../helpers');
const { resetCognitoPassword } = require('../../../middlewares/awsConfig');
const { resetPasswordError, resetPasswordSuccess } = require('./constants');

const resetPassword = async ({ code, email, password }) => {
  try {
    await resetCognitoPassword({ code, email, password });

    return {
      __typename: 'Success',
      message: resetPasswordSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || resetPasswordError,
    };
  }
};

module.exports = resetPassword;
