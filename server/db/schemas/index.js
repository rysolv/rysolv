const activitySchema = require('./activity');
const commentSchema = require('./comments');
const fundingSchema = require('./funding');
const issueSchema = require('./issues');
const organizationSchema = require('./organizations');
const pullRequestSchema = require('./pullRequest');
const userSchema = require('./users');
const withdrawalSchema = require('./withdrawal');

module.exports = {
  ...activitySchema,
  ...commentSchema,
  ...fundingSchema,
  ...issueSchema,
  ...organizationSchema,
  ...pullRequestSchema,
  ...userSchema,
  ...withdrawalSchema,
};
