const { CustomError, errorLogger } = require('../../../helpers');
const {
  updatePaymentMethodError,
  updatePaymentMethodSuccess,
} = require('./constants');

const updatePaymentMethod = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    return {
      __typename: 'Success',
      message: updatePaymentMethodSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: updatePaymentMethodError,
    };
  }
};

module.exports = updatePaymentMethod;
