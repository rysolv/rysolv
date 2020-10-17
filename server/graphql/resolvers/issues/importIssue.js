const { checkDuplicateIssue, getOrganizationsWhere } = require('../../../db');
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

    // Get organization detail from github API
    const { organizationInput } = await getSingleRepo({
      organization,
      repo,
    });

    // Return organizaiton ID if exists in db
    const [organizationData] = await getOrganizationsWhere({
      column: 'repo_url',
      value: organizationInput.organizationRepo,
    });

    if (organizationData) {
      const { id, logo } = organizationData;
      issueInput.organizationId = id;
      organizationInput.organizationLogo = logo;
    }

    const importData = { ...issueInput, ...organizationInput };
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
