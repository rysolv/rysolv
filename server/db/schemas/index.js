const activitySchema = require('./activity');
const commentSchema = require('./comments');
const issueSchema = require('./issues');
const organizationSchema = require('./organizations');
const pullRequestSchema = require('./pullRequest');
const userSchema = require('./users');
const watchingSchema = require('./watching');
const withdrawalSchema = require('./withdrawal');

module.exports = {
  activitySchema,
  commentSchema,
  issueSchema,
  organizationSchema,
  pullRequestSchema,
  userSchema,
  watchingSchema,
  withdrawalSchema,
};
