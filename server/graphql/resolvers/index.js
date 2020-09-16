const activityResolver = require('./activity');
const attemptingResolver = require('./attemptingResolver');
const commentResolver = require('./commentResolver');
const issueResolver = require('./issueResolver');
const organizationResolver = require('./organzationResolver');
const paymentResolver = require('./paymentResolver');
const pullRequestResolver = require('./pullRequestResolver');
const userResolver = require('./userResolver');
const watchingResolver = require('./watchingResolver');
const withdrawalResolver = require('./withdrawalResolver');
const { objectScalerType } = require('./scalers');

const rootResolver = {
  ...activityResolver,
  ...attemptingResolver,
  ...commentResolver,
  ...issueResolver,
  ...objectScalerType,
  ...organizationResolver,
  ...paymentResolver,
  ...pullRequestResolver,
  ...userResolver,
  ...watchingResolver,
  ...withdrawalResolver,
};

module.exports = rootResolver;
