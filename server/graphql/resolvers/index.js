const activityResolver = require('./activityResolver');
const commentResolver = require('./commentResolver');
const issueResolver = require('./issueResolver');
const organizationResolver = require('./organzationResolver');
const pullRequestResolver = require('./pullRequestResolver');
const userResolver = require('./userResolver');
const withdrawalResolver = require('./withdrawalResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...activityResolver,
  ...commentResolver,
  ...issueResolver,
  ...objectScalerType,
  ...organizationResolver,
  ...pullRequestResolver,
  ...userResolver,
  ...withdrawalResolver,
};

module.exports = rootResolver;
