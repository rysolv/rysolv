/* eslint-disable no-param-reassign */
const { createActivity } = require('../activity');
const { isUrl } = require('../../../helpers');
const {
  transformOrganization: transformOrganizationQuery,
} = require('../../../db');
const {
  transformOrganizationError,
  transformOrganizationSuccess,
} = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformOrganization = async ({ organizationId, organizationInput }) => {
  try {
    const logo = organizationInput.organizationLogo;

    if (logo && !isUrl(logo)) {
      const { uploadUrl } = await uploadImage(logo);
      organizationInput.logo = uploadUrl;
    }

    const data = {
      contributors: organizationInput.contributors,
      description: organizationInput.organizationDescription,
      issues: organizationInput.issues,
      logo: organizationInput.logo,
      modified_date: new Date(), // update modified date
      name: organizationInput.organizationName,
      organization_url: organizationInput.organizationUrl,
      owner_id: organizationInput.ownerId,
      preferred_languages: organizationInput.organizationPreferredLanguages,
      repo_url: organizationInput.organizationRepo,
      total_funded: organizationInput.totalFunded,
      verified: organizationInput.organizationVerified,
    };
    const result = await transformOrganizationQuery({ data, organizationId });

    const activityInput = {
      actionType: 'update',
      organizationId: result.id,
      userId: result.ownerId,
    };

    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: transformOrganizationSuccess,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: transformOrganizationError,
    };
  }
};

module.exports = transformOrganization;
