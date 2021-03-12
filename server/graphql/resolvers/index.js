const { objectScalerType } = require('./scalers');
const activityResolver = require('./activity');
const attemptingResolver = require('./attempting');
const commentResolver = require('./comments');
const issueResolver = require('./issues');
const paymentResolver = require('./payments');
const pullRequestResolver = require('./pullRequests');
const questionResolver = require('./questions');
const repoResolver = require('./repos');
const statsResolver = require('./stats');
const userResolver = require('./users');
const watchingResolver = require('./watching');
const withdrawalResolver = require('./withdrawal');

const rootResolver = {
  ...activityResolver,
  ...attemptingResolver,
  ...commentResolver,
  ...issueResolver,
  ...objectScalerType,
  ...paymentResolver,
  ...pullRequestResolver,
  ...questionResolver,
  ...repoResolver,
  ...statsResolver,
  ...userResolver,
  ...watchingResolver,
  ...withdrawalResolver,
};

module.exports = rootResolver;
