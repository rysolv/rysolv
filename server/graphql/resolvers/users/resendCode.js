const { errorLogger } = require('../../../helpers');
const { resendCodeError, resendCodeSuccess } = require('./constants');
const { resendConfirmationCode } = require('../../../middlewares/awsConfig');

const resendCode = async ({ email }) => {
  try {
    await resendConfirmationCode({ email });
    return {
      __typename: 'Success',
      message: resendCodeSuccess({ email }),
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: resendCodeError,
    };
  }
};

module.exports = resendCode;
