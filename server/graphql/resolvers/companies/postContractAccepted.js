const { CustomError, errorLogger } = require('../../../helpers');
const {
  postContractAccepted: postContractAcceptedQuery,
} = require('../../../db');
const {
  postContractAcceptedError,
  postContractAcceptedSuccess,
} = require('./constants');

const postContractAccepted = async (
  { companyId, contractAccepted },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    if (companyId && contractAccepted) {
      await postContractAcceptedQuery({ companyId });
    } else {
      throw new Error(
        'In order to use our service, you must agree to our Terms and Conditions.',
      );
    }

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
