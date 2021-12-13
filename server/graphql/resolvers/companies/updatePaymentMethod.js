/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { setPaymentError, setPaymentSuccess } = require('./constants');

const updatePaymentMethod = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    return {
      __typename: 'Success',
      message: setPaymentSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: setPaymentError,
    };
  }
};

module.exports = updatePaymentMethod;
