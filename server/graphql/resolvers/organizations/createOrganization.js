const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const { checkDuplicate } = require('./constants');
const { createActivity } = require('../activity');
const {
  createOrganization: createOrganizationQuery,
  updateUserArray,
} = require('../../../db');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createOrganization = async args => {
  const {
    organizationInput,
    organizationInput: { identiconId },
  } = args;

  if (identiconId && identiconId !== 'undefined') {
    organizationInput.organizationLogo = new Identicon(
      identiconId,
      250,
    ).toString();
  }

  try {
    const { uploadUrl } = await uploadImage(organizationInput.organizationLogo);

    const organization = {
      contributors: organizationInput.contributors || [],
      created_date: new Date(),
      description: organizationInput.organizationDescription,
      id: uuidv4(),
      is_manual: organizationInput.isManual,
      issues: organizationInput.issues || [],
      logo: uploadUrl,
      modified_date: new Date(),
      name: organizationInput.organizationName,
      organization_url: organizationInput.organizationUrl || '',
      owner_id: organizationInput.ownerId,
      preferred_languages: organizationInput.preferredLanguages || [],
      repo_url: organizationInput.organizationRepo,
      total_funded: organizationInput.totalFunded || 0,
      verified: organizationInput.verified || false,
    };

    await checkDuplicate(organization.repo_url);

    // create organization
    const result = await createOrganizationQuery({ data: organization });

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
      ...result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = createOrganization;
