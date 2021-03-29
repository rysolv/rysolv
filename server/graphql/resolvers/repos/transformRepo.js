/* eslint-disable no-param-reassign */
const { createActivity } = require('../activity');
const { CustomError, errorLogger, isUrl } = require('../../../helpers');
const { transformRepo: transformRepoQuery } = require('../../../db');
const { transformRepoError, transformRepoSuccess } = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformRepo = async ({ repoId, repoInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const logo = repoInput.repoLogo;
    if (logo && !isUrl(logo)) {
      const { uploadUrl } = await uploadImage(logo);
      repoInput.logo = uploadUrl;
    }

    const data = {
      description: repoInput.repoDescription,
      is_edited: true,
      logo: repoInput.logo,
      modified_date: new Date(), // update modified date
      name: repoInput.repoName,
      organization_url: repoInput.organizationUrl,
      repo_url: repoInput.repoUrl,
      verified: repoInput.repoVerified,
    };
    const result = await transformRepoQuery({ data, repoId });

    const activityInput = {
      actionType: 'update',
      repoId: result.id,
      userId: result.ownerId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: transformRepoSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformRepoError,
    };
  }
};

module.exports = transformRepo;
