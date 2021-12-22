const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const exchangePlaidToken = async ({ accountId, token }) => {
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: token,
  });
  const accessToken = response.data.access_token;

  // Generate a stripe bank account token
  const { data } = await plaidClient.processorStripeBankAccountTokenCreate({
    access_token: accessToken,
    account_id: accountId,
  });

  const bankAccountToken = data.stripe_bank_account_token;
  return bankAccountToken;
};

module.exports = exchangePlaidToken;
