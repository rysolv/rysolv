/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { setPaymentError, setPaymentSuccess } = require('./constants');
const {
  createBankAccount,
  exchangePlaidToken,
  setPaymentIntent,
} = require('../../../integrations');
const { getUserCompany, transformCompany } = require('../../../db');

const updatePaymentMethod = async (
  { provider, token, metadata },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { customerId, id } = await getUserCompany({ userId });

    if (provider === 'stripe') {
      const { brand, mask } = metadata;

      // Add card to Stripe
      await setPaymentIntent({ customerId, provider, token });

      // Update account mask
      const stub = `${brand} Card ending in ${mask}`;
      await transformCompany({
        id,
        modified_date: new Date(),
        payment_method: stub,
      });
    }
    if (provider === 'plaid') {
      const { accountId, accountName, bank, mask } = metadata;

      // Get Stripe Bank token from Plaid
      const bankToken = await exchangePlaidToken({ accountId, token });

      // Add bank account to stripe customer
      await createBankAccount({ customerId, token: bankToken });

      // Update account mask
      const stub = `${accountName} - ${bank} account ending in ${mask}`;
      await transformCompany({
        id,
        modified_date: new Date(),
        payment_method: stub,
      });
    }

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
