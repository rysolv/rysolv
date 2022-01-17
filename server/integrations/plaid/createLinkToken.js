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

const createLinkToken = async () => {
  const request = {
    user: {
      client_user_id: 'user-id',
    },
    client_name: 'Plaid Test App',
    country_codes: ['US'],
    language: 'en',
    products: ['auth'],
    webhook: 'https://sample-web-hook.com',
    account_filters: {
      depository: {
        account_subtypes: ['checking', 'savings'],
      },
    },
  };

  const { data } = await plaidClient.linkTokenCreate(request);
  return data.link_token;
};

module.exports = createLinkToken;
