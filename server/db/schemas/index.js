const activitySchema = require('./activity');
const attemptingSchema = require('./attempting');
const commentSchema = require('./comments');
const companyPositionCandidatesSchema = require('./candidatePositions');
const companyPositionsSchema = require('./companyPositions');
const companySchema = require('./companies');
const cronActivitySchema = require('./cronActivity');
const fundingSchema = require('./funding');
const hiringActivitySchema = require('./hiringActivity');
const issueSchema = require('./issues');
const languageSchema = require('./languages');
const legalContractsSchema = require('./legalContracts');
const locationsSchema = require('./locations');
const messagesSchema = require('./messages');
const notificationSchema = require('./notifications');
const paymentsSchema = require('./payments');
const positionTechStackSchema = require('./positionTechStack');
const pullRequestSchema = require('./pullRequest');
const questionResponseSchema = require('./questionResponses');
const questionSchema = require('./questions');
const repoSchema = require('./repos');
const signedContractsSchema = require('./signedContracts');
const technologiesSchema = require('./technologies');
const userCompaniesSchema = require('./userCompanies.js');
const userQuestionResponseSchema = require('./userQuestionResponses');
const userReposSchema = require('./userRepos');
const userSchema = require('./users');
const watchingSchema = require('./watching');
const withdrawalSchema = require('./withdrawal');

module.exports = {
  ...activitySchema,
  ...attemptingSchema,
  ...commentSchema,
  ...companyPositionCandidatesSchema,
  ...companyPositionsSchema,
  ...companySchema,
  ...cronActivitySchema,
  ...fundingSchema,
  ...hiringActivitySchema,
  ...issueSchema,
  ...languageSchema,
  ...legalContractsSchema,
  ...locationsSchema,
  ...messagesSchema,
  ...notificationSchema,
  ...paymentsSchema,
  ...positionTechStackSchema,
  ...pullRequestSchema,
  ...questionResponseSchema,
  ...questionSchema,
  ...repoSchema,
  ...signedContractsSchema,
  ...technologiesSchema,
  ...userCompaniesSchema,
  ...userQuestionResponseSchema,
  ...userReposSchema,
  ...userSchema,
  ...watchingSchema,
  ...withdrawalSchema,
};
