/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  addRepoMembers,
  createLanguage,
  createRepo: createRepoQuery,
  getUserSettings,
  updateUserArray,
} = require('../../../db');
const {
  checkDuplicate,
  createRepoError,
  createRepoSuccess,
} = require('./constants');
const { createActivity } = require('../activity');
const {
  CustomError,
  errorLogger,
  formatMemberList,
} = require('../../../helpers');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createRepo = async ({ repoInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { identiconId } = repoInput;
    if (identiconId && identiconId !== 'undefined') {
      repoInput.repoLogo = new Identicon(identiconId, 250).toString();
    }
    const { uploadUrl } = await uploadImage(repoInput.repoLogo);
    const repoId = uuidv4();

    const repo = {
      created_date: new Date(),
      description: repoInput.repoDescription,
      id: repoId,
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

    const { githubId } = await getUserSettings({ userId });

    // Create repo
    const result = await createRepoQuery({ data: repo });

    await addRepoMembers({
      members: await formatMemberList({
        githubId,
        repoId,
        repoUrl: repoInput.importUrl,
        userId,
      }),
    });

    if (repoInput.repoLanguages) {
      await createLanguage({
        languages: repoInput.repoLanguages,
        target: { repoId: result.id },
      });
    }

    // Add repo to user
    await updateUserArray({
      column: 'repos',
      data: result.id,
      userId: result.ownerId,
    });

    // Log activity
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
