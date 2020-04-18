const issueResolver = require('./issueResolver');
const organizationResolver = require('./organzationResolver');
const userResolver = require('./userResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...issueResolver,
  ...objectScalerType,
  ...organizationResolver,
  ...userResolver,
};

module.exports = rootResolver;
