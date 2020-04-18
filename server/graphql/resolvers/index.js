const issueResolver = require('./issueResolver');
const userResolver = require('./userResolver');
const commentResolver = require('./commentResolver');
const organizationResolver = require('./organzationResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...issueResolver,
  ...commentResolver,
  ...objectScalerType,
  ...organizationResolver,
  ...userResolver,
};

module.exports = rootResolver;
