const github = require('./github');
const stripe = require('./stripe');
const plaid = require('./plaid');

module.exports = {
  ...github,
  ...plaid,
  ...stripe,
};
