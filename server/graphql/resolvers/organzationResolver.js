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
} = require('../../db');

const { createActivity } = require('./activityResolver');

const { getSingleRepo } = require('../../integrations');
const defaultOrgLogo =
  'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png';

module.exports = {
  createOrganization: async args => {
    const { organizationInput } = args;

    if (
      await checkDuplicateOrganization(
        'organizations',
        organizationInput.organizationRepo,
      )
    ) {
      throw new Error(
        `An organization at ${
          organizationInput.organizationRepo
        } already exists`,
      );
    }

    const organization = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        organizationInput.organizationName,
        organizationInput.organizationDescription,
        organizationInput.organizationRepo,
        organizationInput.organizationUrl || '',
        organizationInput.issues || [],
        organizationInput.organizationLogo || defaultOrgLogo,
        organizationInput.verified || false,
        organizationInput.contributors || [],
        organizationInput.ownerId,
        organizationInput.totalFunded || 0,
        organizationInput.preferredLanguages || [],
      ],
    ];
    try {
      const [result] = await createOrganization(organization);

      const activityInput = {
        actionType: 'create',
        organizationId: result.id,
        userId: result.owner_id,
      };
      await createActivity({ activityInput });

      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteOrganization: async args => {
    const { id } = args;
    try {
      const result = await deleteOrganization('organizations', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
  getOrganizations: async () => {
    try {
      const result = await getOrganizations('organizations');
      return result;
    } catch (err) {
      throw err;
    }
  },
  importOrganization: async args => {
    const { url } = args;
    try {
      if (await checkDuplicateOrganization('organizations', url)) {
        throw new Error(`Organization at ${url} already exists`);
      }

      const { organizationInput: ImportData } = await getSingleRepo(url);

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
      const [result] = await getOneOrganization('organizations', id);
      const { contributors, issues } = result;
      const contributorsResult = await Promise.all(
        contributors.map(async contributorId => {
          const [userResult] = await getOneUser('users', contributorId);
          return userResult;
        }),
      );
      result.contributors = contributorsResult;
      const issuesResult = await Promise.all(
        issues.map(async issueId => {
          const [issueResult] = await getOneIssue('issues', issueId);
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
      const result = await searchOrganizations('organizations', value);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformOrganization: async args => {
    const { id, organizationInput } = args;
    try {
      const data = {
        modified_date: new Date(), // update modified date
        name: organizationInput.name,
        description: organizationInput.description,
        repo_url: organizationInput.repoUrl,
        organizationUrl: organizationInput.organizationUrl,
        issues: organizationInput.issues,
        logo: organizationInput.logo,
        verified: organizationInput.verified,
        contributors: organizationInput.contributors,
        owner_id: organizationInput.ownerId,
        total_funded: organizationInput.totalFunded,
        preferred_languages: organizationInput.preferredLanguages,
      };
      const queryResult = await transformOrganization(
        'organizations',
        id,
        data,
      );
      const result = {
        id: queryResult.id,
        createdDate: queryResult.created_date,
        modifiedDate: queryResult.modified_date,
        name: queryResult.name,
        description: queryResult.description,
        repoUrl: queryResult.repo_url,
        organizationUrl: queryResult.organizationUrl,
        issues: queryResult.issues,
        logo: queryResult.logo,
        verified: queryResult.verified,
        contributors: queryResult.contributors,
        ownerId: queryResult.owner_id,
        totalFunded: queryResult.total_funded,
        preferredLanguages: queryResult.preferred_languages,
      };

      const activityInput = {
        actionType: 'create',
        organizationId: result.id,
        userId: result.owner_id,
      };
      await createActivity({ activityInput });

      return result;
    } catch (err) {
      throw err;
    }
  },
};
