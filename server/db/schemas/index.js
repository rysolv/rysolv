const userSchema = require('./users');
const issueSchema = require('./issues');
const commentSchema = require('./comments');
const organizationSchema = require('./organizations');
const pullRequestSchema = require('./pullRequest');

module.exports = {
  userSchema,
  issueSchema,
  commentSchema,
  organizationSchema,
  pullRequestSchema,
};
