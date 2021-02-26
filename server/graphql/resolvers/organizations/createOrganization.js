/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicate,
  createOrganizationError,
  createOrganizationSuccess,
} = require('./constants');
const { createActivity } = require('../activity');
const {
  createLanguage,
  createOrganization: createOrganizationQuery,
  updateUserArray,
} = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createOrganization = async (
  { organizationInput },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { identiconId } = organizationInput;
    if (identiconId && identiconId !== 'undefined') {
      organizationInput.organizationLogo = new Identicon(
        identiconId,
        250,
      ).toString();
    }
    const { uploadUrl } = await uploadImage(organizationInput.organizationLogo);

    const organization = {
      created_date: new Date(),
      description: organizationInput.organizationDescription,
      id: uuidv4(),
      is_manual: organizationInput.isManual,
      issues: organizationInput.issues || [],
      logo: uploadUrl,
      modified_date: new Date(),
      name: organizationInput.organizationName,
      organization_url: organizationInput.organizationUrl || '',
      owner_id: userId,
      repo_url: organizationInput.organizationRepo,
      verified: organizationInput.verified || false,
    };

    await checkDuplicate(organization.repo_url);

    // create organization
    const result = await createOrganizationQuery({ data: organization });

    if (organizationInput.organizationLanguages) {
      await createLanguage({
        languages: organizationInput.organizationLanguages,
        target: { organizationId: result.id },
      });
    }

    // add organization to user
    await updateUserArray({
      column: 'organizations',
      data: result.id,
      userId: result.ownerId,
    });

    // log activity
    const activityInput = {
      actionType: 'create',
      organizationId: result.id,
      userId: result.ownerId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Organization',
      message: createOrganizationSuccess,
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createOrganizationError,
    };
  }
};

module.exports = createOrganization;
