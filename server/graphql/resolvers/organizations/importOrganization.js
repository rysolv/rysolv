const { checkDuplicate, importOrganizationError } = require('./constants');
const { errorLogger } = require('../../../helpers');
const {
  formatOrganizationUrl,
} = require('../../../integrations/github/helpers');
const {
  getSingleRepo,
  getSingleOrganization,
} = require('../../../integrations');

const importOrganization = async ({ url }) => {
  try {
    // Parse organization url
    const { organization, repo, type } = formatOrganizationUrl(url);

    // If user supplied an organization : pull organization data
    if (type === 'organization') {
      const { organizationInput: importData } = await getSingleOrganization(
        organization,
      );
      await checkDuplicate(importData.organizationRepo);

      return {
        __typename: 'ImportData',
        ...importData,
      };
    }

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
    errorLogger(error);
    return {
      __typename: 'Error',
      message: importOrganizationError,
    };
  }
};

module.exports = importOrganization;
