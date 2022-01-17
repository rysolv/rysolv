/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { createLinkToken } = require('../../../integrations');
const { setPaymentError } = require('./constants');

const getPlaidToken = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const token = await createLinkToken();

    return {
      __typename: 'Success',
      message: token,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: setPaymentError,
    };
  }
};

module.exports = getPlaidToken;
