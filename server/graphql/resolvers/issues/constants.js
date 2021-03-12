const { v4: uuidv4 } = require('uuid');

const { uploadImage } = require('../../../middlewares/imageUpload');

const newIssueObject = (issueId, issueInput) => ({
  attempting: issueInput.attempting || [], // attempting
  body: issueInput.body, // body
  comments: issueInput.comments || [], // comments
  contributor_id: issueInput.contributor, // contributor
  created_date: new Date(), // created_date
  funded_amount: issueInput.fundedAmount || 0, // funded_amount
  github_comment_count: issueInput.githubCommentCount,
  id: issueId, // id
  is_manual: issueInput.isManual,
  language: issueInput.language || [], // language
  modified_date: new Date(), // modified_data
  name: issueInput.name, // name
  open: issueInput.open || true, // open
  rep: issueInput.rep || 25, // rep
  repo_id: issueInput.repoId, // repo_id
  repo: issueInput.repo, // repo
  type: issueInput.type, // bug
});

const newRepoObject = async repoInput => {
  const repoId = uuidv4();
  const { uploadUrl } = await uploadImage(repoInput.repoLogo);

  return {
    created_date: new Date(), // created_date
    description: repoInput.repoDescription, // description
    id: repoId, // id
    is_manual: repoInput.isManual, // is_manual
    issues: repoInput.issues || [], // issues
    logo: uploadUrl, // logo
    modified_date: new Date(), // modified_date
    name: repoInput.repoName, // name
    organization_url: repoInput.organizationUrl || '', // url
    owner_id: repoInput.contributor, // owner_id
    repo_url: repoInput.repoUrl, // repo
    verified: repoInput.verified || false, // verified
  };
};

const closeIssueError = ({ shouldClose }) =>
  `Something went wrong when ${
    shouldClose ? 'closing' : 'reopening'
  } your issue.`;

const closeIssueSuccess = ({ shouldClose }) =>
  `Your issue has been successfully ${shouldClose ? 'closed' : 'reopened'}.`;

const createIssueError = `Something went wrong when creating the issue.`;

const createIssueSuccess = `Issue was successfully created.`;

const createRepoError = `Something went wrong when creating the repo for the issue.`;

const existingIssueError = `This issue already exists.`;

const existingRepoError = `This repo already exists.`;

const getFilterError = `Something went wrong when getting filter criteria.`;

const getIssuesError = `Something went wrong when getting issues.`;

const importIssueError = `Something went wrong when importing this issue.`;

const oneIssueError = `Something went wrong when getting this issue.`;

const transformIssueError = `Something went wrong when editing this issue.`;

const transformIssueSuccess = `Your issue was successfully edited.`;

const upvoteIssueError = ({ upvote }) =>
  `Something went wrong when ${upvote ? 'upvoting' : 'downvoting'} the issue.`;

module.exports = {
  closeIssueError,
  closeIssueSuccess,
  createIssueError,
  createIssueSuccess,
  createRepoError,
  existingIssueError,
  existingRepoError,
  getFilterError,
  getIssuesError,
  importIssueError,
  newIssueObject,
  newRepoObject,
  oneIssueError,
  transformIssueError,
  transformIssueSuccess,
  upvoteIssueError,
};
