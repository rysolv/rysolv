const { createActivity } = require('../activity');
const { isUrl } = require('../../../helpers');
const {
  transformOrganization: transformOrganizationQuery,
} = require('../../../db');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformOrganization = async args => {
  const { organizationId, organizationInput } = args;
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

module.exports = transformOrganization;
