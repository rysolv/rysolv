const {
  checkDuplicate,
  importOrganizationError,
  typeOrganizationError,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const {
  formatOrganizationUrl,
} = require('../../../integrations/github/helpers');
const { getSingleRepo } = require('../../../integrations');

const importOrganization = async ({ url }) => {
  try {
    // Parse organization url
    const { organization, repo, type } = formatOrganizationUrl(url);

    // If user supplied an organization, throw error
    if (type === 'organization') throw new CustomError(typeOrganizationError);

    // Else pull repo data
    const { organizationInput: importData } = await getSingleRepo({
      organization,
      repo,
    });

    await checkDuplicate(importData.organizationRepo);

    return {
      __typename: 'ImportData',
      ...importData,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || importOrganizationError,
    };
  }
};

module.exports = importOrganization;
