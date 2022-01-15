const { CustomError, errorLogger, sendEmail } = require('../../../helpers');
const {
  createBankAccount,
  exchangePlaidToken,
  setPaymentIntent,
} = require('../../../integrations');
const { getUserCompany, transformCompany } = require('../../../db');
const {
  updatePaymentMethodError,
  updatePaymentMethodSuccess,
} = require('./constants');

const updatePaymentMethod = async (
  { provider, token, metadata },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    // Fetch stripe customer_id
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

    // Send payment updated email
    sendEmail({
      body: { companyId: id },
      path: '/s/company/contractAccepted',
    });

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
