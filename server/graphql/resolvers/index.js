const issueResolver = require('./issueResolver');
const userResolver = require('./userResolver');
const organizationResolver = require('./organzationResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...issueResolver,
  ...objectScalerType,
  ...organizationResolver,
  ...userResolver,
};

module.exports = rootResolver;
