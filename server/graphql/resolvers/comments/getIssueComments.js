const { errorLogger } = require('../../../helpers');
const { formatIssueUrl } = require('../../../integrations/github/helpers');
const { getGithubIssueComments } = require('../../../integrations/github');
const {
  getIssueComments: getIssueCommentsQuery,
  getOneIssue,
} = require('../../../db');

const getIssueComments = async ({ issueId }) => {
  try {
    const { repo: url } = await getOneIssue({ issueId });
    const { issueNumber, organization, repo } = formatIssueUrl(url);

    const rysolvComments = await getIssueCommentsQuery({ issueId });
    const githubComments = await getGithubIssueComments({
      issueNumber,
      organization,
      repo,
    });

    const comments = rysolvComments.concat(githubComments);
    return comments.sort((a, b) => a.createdDate - b.createdDate);
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getIssueComments;
