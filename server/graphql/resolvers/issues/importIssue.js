const { checkDuplicateIssue, getReposWhere } = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const { existingIssueError, importIssueError } = require('./constants');
const { formatIssueUrl } = require('../../../integrations/github/helpers');
const { getSingleIssue, getSingleRepo } = require('../../../integrations');

const importIssue = async ({ url }) => {
  try {
    // Parse issue url
    const { issueNumber, organization, repo } = formatIssueUrl(url);

    // Get issue detail from github API
    const { issueInput } = await getSingleIssue({
      issueNumber,
      organization,
      repo,
    });

    // Check issue repo for duplicate
    if (await checkDuplicateIssue({ repo: issueInput.issueUrl }))
      throw new CustomError(existingIssueError);

    // Get repo detail from github API
    const { repoInput } = await getSingleRepo({
      organization,
      repo,
    });

    // Return repo ID if exists in db
    const [repoData] = await getReposWhere({
      column: 'repo_url',
      value: repoInput.repoUrl,
    });

    if (repoData) {
      const { id, logo } = repoData;
      issueInput.repoId = id;
      repoInput.repoLogo = logo;
    }

    const importData = { ...issueInput, ...repoInput };
    return {
      __typename: 'ImportData',
      ...importData,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || importIssueError,
    };
  }
};

module.exports = importIssue;
