/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicate,
  createRepoError,
  createRepoSuccess,
} = require('./constants');
const { createActivity } = require('../activity');
const { createLanguage, createRepo: createRepoQuery } = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createRepo = async ({ repoInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { identiconId } = repoInput;
    if (identiconId && identiconId !== 'undefined') {
      repoInput.repoLogo = new Identicon(identiconId, 250).toString();
    }
    const { uploadUrl } = await uploadImage(repoInput.repoLogo);

    const repo = {
      created_date: new Date(),
      description: repoInput.repoDescription,
      id: uuidv4(),
      is_manual: repoInput.isManual,
      issues: repoInput.issues || [],
      logo: uploadUrl,
      modified_date: new Date(),
      name: repoInput.repoName,
      organization_url: repoInput.organizationUrl || '',
      owner_id: userId,
      repo_url: repoInput.repoUrl,
      verified: repoInput.verified || false,
    };

    await checkDuplicate(repo.repo_url);

    // Create repo
    const result = await createRepoQuery({ data: repo });

    if (repoInput.repoLanguages) {
      await createLanguage({
        languages: repoInput.repoLanguages,
        target: { repoId: result.id },
      });
    }

    // log activity
    const activityInput = {
      actionType: 'create',
      repoId: result.id,
      userId: result.ownerId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Repo',
      message: createRepoSuccess,
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createRepoError,
    };
  }
};

module.exports = createRepo;
