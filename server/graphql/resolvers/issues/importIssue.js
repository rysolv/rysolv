const { checkDuplicateIssue, getOrganizationsWhere } = require('../../../db');
const { formatIssueUrl } = require('../../../integrations/github/helpers');
const { getSingleIssue, getSingleRepo } = require('../../../integrations');

const importIssue = async args => {
  const { url } = args;
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
    if (await checkDuplicateIssue({ repo: issueInput.issueUrl })) {
      throw new Error(`Issue at ${issueInput.issueUrl} already exists`);
    }

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

    const ImportData = { ...issueInput, ...organizationInput };

    return {
      __typename: 'ImportData',
      ...ImportData,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = importIssue;
