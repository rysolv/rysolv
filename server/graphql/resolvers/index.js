const { objectScalerType } = require('./scalers');
const activityResolver = require('./activity');
const attemptingResolver = require('./attempting');
const bountyResolver = require('./bounties');
const commentResolver = require('./comments');
const companiesResolver = require('./companies');
const contactResolver = require('./contact');
const issueResolver = require('./issues');
const messageResolver = require('./messages');
const paymentResolver = require('./payments');
const pullRequestResolver = require('./pullRequests');
const questionResolver = require('./questions');
const repoResolver = require('./repos');
const statsResolver = require('./stats');
const technologiesResolver = require('./technologies');
const userResolver = require('./users');
const watchingResolver = require('./watching');
const withdrawalResolver = require('./withdrawal');

const rootResolver = {
  ...activityResolver,
  ...attemptingResolver,
  ...bountyResolver,
  ...commentResolver,
  ...companiesResolver,
  ...contactResolver,
  ...issueResolver,
  ...messageResolver,
  ...objectScalerType,
  ...paymentResolver,
  ...pullRequestResolver,
  ...questionResolver,
  ...repoResolver,
  ...statsResolver,
  ...technologiesResolver,
  ...userResolver,
  ...watchingResolver,
  ...withdrawalResolver,
};

module.exports = rootResolver;
