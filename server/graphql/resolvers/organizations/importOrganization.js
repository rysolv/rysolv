const { checkDuplicate } = require('./constants');
const {
  formatOrganizationUrl,
} = require('../../../integrations/github/helpers');
const {
  getSingleRepo,
  getSingleOrganization,
} = require('../../../integrations');

const importOrganization = async args => {
  const { url } = args;
  try {
    // Parse organization url
    const { organization, repo, type } = formatOrganizationUrl(url);

    // If user supplied an organization : pull organization data
    if (type === 'organization') {
      const { organizationInput: ImportData } = await getSingleOrganization(
        organization,
      );
      await checkDuplicate(ImportData.organizationRepo);

      return {
        __typename: 'ImportData',
        ...ImportData,
      };
    }

    // Else pull repo data
    const { organizationInput: ImportData } = await getSingleRepo({
      organization,
      repo,
    });

    await checkDuplicate(ImportData.organizationRepo);

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

module.exports = importOrganization;
