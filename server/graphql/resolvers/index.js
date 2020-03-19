const issueResolver = require('./issueResolver');
const userResolver = require('./userResolver');

const rootResolver = {
  ...issueResolver,
  ...userResolver,
};

module.exports = rootResolver;
