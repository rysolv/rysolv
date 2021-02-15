const activitySchema = require('./activity');
const attemptingSchema = require('./attempting');
const commentSchema = require('./comments');
const cronActivitySchema = require('./cronActivity');
const fundingSchema = require('./funding');
const issueSchema = require('./issues');
const languageSchema = require('./languages');
const organizationSchema = require('./organizations');
const paymentsSchema = require('./payments');
const pullRequestSchema = require('./pullRequest');
const questionResponseSchema = require('./questionResponses');
const questionSchema = require('./questions');
const userQuestionResponseSchema = require('./userQuestionResponses');
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
  ...organizationSchema,
  ...paymentsSchema,
  ...pullRequestSchema,
  ...questionResponseSchema,
  ...questionSchema,
  ...userQuestionResponseSchema,
  ...userSchema,
  ...watchingSchema,
  ...withdrawalSchema,
};
