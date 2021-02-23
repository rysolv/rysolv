const { checkDuplicate, importRepoError } = require('./constants');
const { errorLogger } = require('../../../helpers');
const { formatRepoUrl } = require('../../../integrations/github/helpers');
const {
  getSingleOrganization,
  getSingleRepo,
} = require('../../../integrations');

const importRepo = async ({ url }) => {
  try {
    // Parse repo url
    const { organization, repo, type } = formatRepoUrl(url);

    // If user supplied an organization: pull organization data
    if (type === 'organization') {
      const { repoInput: importData } = await getSingleOrganization(
        organization,
      );
      await checkDuplicate(importData.repoUrl);

      return {
        __typename: 'ImportData',
        ...importData,
      };
    }

    // Else pull repo data
    const { repoInput: importData } = await getSingleRepo({
      organization,
      repo,
    });

    await checkDuplicate(importData.repoUrl);

    return {
      __typename: 'ImportData',
      ...importData,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || importRepoError,
    };
  }
};

module.exports = importRepo;
