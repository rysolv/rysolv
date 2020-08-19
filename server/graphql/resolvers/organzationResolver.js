const Identicon = require('identicon.js');

const { v4: uuidv4 } = require('uuid');
const {
  checkDuplicateOrganization,
  createOrganization,
  deleteOrganization,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOrganizations,
  searchOrganizations,
  transformOrganization,
  updateUserArray,
} = require('../../db');
const { createActivity } = require('./activityResolver');
const { formatOrganizationUrl } = require('../../integrations/github/helpers');
const { getSingleRepo, getSingleOrganization } = require('../../integrations');
const { isUrl } = require('../../helpers');
const { uploadImage } = require('../../middlewares/imageUpload');

const checkDuplicate = async repo => {
  if (await checkDuplicateOrganization(repo)) {
    throw new Error(`An organization at ${repo} already exists`);
  }
};

module.exports = {
  createOrganization: async args => {
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
      const { uploadUrl } = await uploadImage(
        organizationInput.organizationLogo,
      );

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
      const [result] = await createOrganization(organization);

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
  },
  deleteOrganization: async args => {
    const { id } = args;
    try {
      const result = await deleteOrganization(id);
      return {
        __typename: 'Success',
        message: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  getOrganizations: async () => {
    try {
      const result = await getOrganizations();
      return result;
    } catch (err) {
      throw err;
    }
  },
  importOrganization: async args => {
    const { url } = args;
    try {
      // Parse organization url
      const { organization, repo, type } = formatOrganizationUrl(url);

      // If user supplied an organization : pull organization data
      if (type === 'organization') {
        const { organizationInput: ImportData } = await getSingleOrganization(
          organization,
        );
        await checkDuplicate(ImportData.organizationRepo);

        return {
          __typename: 'ImportData',
          ...ImportData,
        };
      }

      // Else pull repo data
      const { organizationInput: ImportData } = await getSingleRepo({
        organization,
        repo,
      });

      await checkDuplicate(ImportData.organizationRepo);

      return {
        __typename: 'ImportData',
        ...ImportData,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  oneOrganization: async args => {
    const { id } = args;
    try {
      const [result] = await getOneOrganization(id);
      const { contributors, issues } = result;
      const contributorsResult = await Promise.all(
        contributors.map(async contributorId => {
          const userResult = await getOneUser(contributorId);
          return userResult;
        }),
      );
      result.contributors = contributorsResult;
      const issuesResult = await Promise.all(
        issues.map(async issueId => {
          const [issueResult] = await getOneIssue(issueId);
          return issueResult;
        }),
      );
      result.issues = issuesResult;
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
  },
  searchOrganizations: async args => {
    const { value } = args;
    try {
      const result = await searchOrganizations(value);
      return {
        __typename: 'OrganizationArray',
        organizationArray: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  transformOrganization: async args => {
    const { id, organizationInput } = args;
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
      const result = await transformOrganization(id, data);

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
  },
};
