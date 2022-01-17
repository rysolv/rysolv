const { CustomError, errorLogger, sendEmail } = require('../../../helpers');
const {
  postContractAccepted: postContractAcceptedQuery,
} = require('../../../db');
const {
  postContractAcceptedError,
  postContractAcceptedSuccess,
} = require('./constants');

const postContractAccepted = async (
  { companyId, plan },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    if (companyId && plan) {
      await postContractAcceptedQuery({ companyId, plan });
    } else {
      throw new Error(
        'In order to use our service, you must agree to our Terms and Conditions.',
      );
    }

    // Send contract accepted email
    // Note: if this is the first contract, send the welcome email
    sendEmail({
      body: { companyId },
      path: '/s/company/contractAccepted',
    });

    return {
      __typename: 'Success',
      message: postContractAcceptedSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || postContractAcceptedError,
    };
  }
};

module.exports = postContractAccepted;
