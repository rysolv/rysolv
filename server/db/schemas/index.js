const activitySchema = require('./activity');
const attemptingSchema = require('./attempting');
const commentSchema = require('./comments');
const cronActivitySchema = require('./cronActivity');
const fundingSchema = require('./funding');
const issueSchema = require('./issues');
const languageSchema = require('./languages');
const notificationSchema = require('./notifications');
const paymentsSchema = require('./payments');
const pullRequestSchema = require('./pullRequest');
const questionResponseSchema = require('./questionResponses');
const questionSchema = require('./questions');
const recruitingSignup = require('./recruiting_signup');
const repoSchema = require('./repos');
const userQuestionResponseSchema = require('./userQuestionResponses');
const userReposSchema = require('./userRepos');
const userSchema = require('./users');
const watchingSchema = require('./watching');
const withdrawalSchema = require('./withdrawal');

module.exports = {
  ...activitySchema,
  ...attemptingSchema,
  ...commentSchema,
  ...cronActivitySchema,
  ...fundingSchema,
  ...issueSchema,
  ...languageSchema,
  ...notificationSchema,
  ...paymentsSchema,
  ...pullRequestSchema,
  ...questionResponseSchema,
  ...questionSchema,
  ...recruitingSignup,
  ...repoSchema,
  ...userQuestionResponseSchema,
  ...userReposSchema,
  ...userSchema,
  ...watchingSchema,
  ...withdrawalSchema,
};
