const issueResolver = require('./issueResolver');
const userResolver = require('./userResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...issueResolver,
  ...objectScalerType,
  ...userResolver,
};

module.exports = rootResolver;
