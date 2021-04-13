const {
  checkDuplicate,
  importRepoError,
  typeOrganizationError,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const { formatRepoUrl } = require('../../../integrations/github/helpers');
const { getSingleRepo } = require('../../../integrations');

const importRepo = async ({ url }) => {
  try {
    // Parse repo url
    const { organization, repo, type } = formatRepoUrl(url);

    // If user supplied an organization, throw error
    if (type === 'organization') throw new CustomError(typeOrganizationError);

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
