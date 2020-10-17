/* eslint-disable no-param-reassign */
const { createActivity } = require('../activity');
const { errorLogger, isUrl } = require('../../../helpers');
const {
  transformOrganization: transformOrganizationQuery,
} = require('../../../db');
const {
  transformOrganizationError,
  transformOrganizationSuccess,
} = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformOrganization = async (
  { organizationId, organizationInput },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const logo = organizationInput.organizationLogo;
    if (logo && !isUrl(logo)) {
      const { uploadUrl } = await uploadImage(logo);
      organizationInput.logo = uploadUrl;
    }

    const data = {
      description: organizationInput.organizationDescription,
      logo: organizationInput.logo,
      modified_date: new Date(), // update modified date
      name: organizationInput.organizationName,
      organization_url: organizationInput.organizationUrl,
      preferred_languages: organizationInput.organizationPreferredLanguages,
      repo_url: organizationInput.organizationRepo,
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
  } catch (error) {
    const { message } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || transformOrganizationError,
    };
  }
};

module.exports = transformOrganization;
