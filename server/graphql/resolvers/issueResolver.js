const { v4: uuidv4 } = require('uuid');

const defaultOrgImage =
  'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png';

const {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  closeIssue,
  createIssue,
  createOrganization,
  deleteIssue,
  getIssues,
  getOneIssue,
  getOrganizationsWhere,
  searchIssues,
  submitAccountPaymentIssue,
  submitAccountPaymentUser,
  transformIssue,
  updateIssueArray,
  updateOrganizationArray,
  updateUserArray,
  upvoteIssue,
} = require('../../db');

const { createActivity } = require('./activityResolver');

const { getSingleIssue, getSingleRepo } = require('../../integrations');
const { formatIssueUrl } = require('../../integrations/github/helpers');

const newIssueArray = (issueId, issueInput) => [
  [
    issueId, // id
    new Date(), // created_date
    new Date(), // modified_data
    issueInput.organizationId, // organization_id
    issueInput.name, // name
    issueInput.body, // nody
    issueInput.repo, // repo
    issueInput.language || [], // language
    issueInput.comments || [], // comments
    issueInput.attempting || [], // attempting
    issueInput.contributor, // contributor
    issueInput.rep || 25, // rep
    issueInput.watching || [], // watching
    issueInput.fundedAmount || 0, // funded_amount
    issueInput.open || true, // open
    issueInput.type || 'bug', // bug
  ],
];

const newOrganizationObject = organizationInput => ({
  id: uuidv4(), // id
  created_date: new Date(), // created_date
  modified_date: new Date(), // modified_date
  name: organizationInput.organizationName, // name
  description: organizationInput.organizationDescription, // description
  repo_url: organizationInput.organizationRepo, // repo
  organization_url: organizationInput.organizationUrl || '', // url
  issues: organizationInput.issues || [], // issues
  logo: organizationInput.organizationLogo || defaultOrgImage, // logo
  verified: organizationInput.verified || false, // verified
  contributors: [], // contributors
  owner_id: organizationInput.contributor, // owner_id
  total_funded: organizationInput.totalFunded || 0, // funded
  preferred_languages: organizationInput.preferred_languages || [], // languages
});

module.exports = {
  closeIssue: async args => {
    const { id, shouldClose } = args;
    try {
      const response = await closeIssue('issues', id, shouldClose);

      const [result] = await getOneIssue('issues', id);

      const activityInput = {
        actionType: shouldClose ? 'close' : 'reopen',
        issueId: result.id,
        organizationId: result.organizationId,
        userId: result.userId,
      };
      await createActivity({ activityInput });

      return response;
    } catch (err) {
      throw err;
    }
  },
  createIssue: async args => {
    const { issueInput } = args;
    const { organizationRepo, repo, organizationId } = issueInput;
    const newIssueId = uuidv4();

    // Populate issue array and create new issue
    const createNewIssue = async () => {
      const issueArray = newIssueArray(newIssueId, issueInput);
      try {
        const result = await createIssue(issueArray);
        return result;
      } catch (err) {
        throw err;
      }
    };
    // ***

    // Populate organization array and create new organization
    const createNewOrganization = async () => {
      // backup check
      if (await checkDuplicateOrganization(organizationRepo)) {
        throw new Error(
          `Error: Organization at ${
            issueInput.organizationRepo
          } already exists`,
        );
      }

      const organizationObject = newOrganizationObject(issueInput);
      try {
        const [result] = await createOrganization(organizationObject);
        return result;
      } catch (err) {
        throw err;
      }
    };
    // ***

    try {
      // Check for duplicate issue
      if (await checkDuplicateIssue('issues', repo)) {
        throw new Error(`Issue at ${repo} already exists`);
      }

      // Check for existing organization. If not: create organization
      if (!organizationId) {
        const organizationResult = await createNewOrganization();

        const activityInput = {
          actionType: 'create',
          organizationId: organizationResult.id,
          userId: organizationResult.ownerId,
        };
        await createActivity({ activityInput });

        issueInput.organizationId = organizationResult.id;
      }

      // Create new issue
      const [issueResult] = await createNewIssue();

      const activityInput = {
        actionType: 'create',
        organizationId: issueResult.organization_id,
        issueId: issueResult.id,
        userId: issueResult.contributor_id,
      };
      await createActivity({ activityInput });

      // add issue to organization issue list
      await updateOrganizationArray(
        'issues',
        issueInput.organizationId,
        newIssueId,
        false,
      );

      // add issue to user issue list
      await updateUserArray(
        'users',
        'issues',
        issueInput.contributor,
        issueResult.id,
        false,
      );

      // add organization to user list
      await updateUserArray(
        'users',
        'organizations',
        issueInput.contributor,
        issueInput.organizationId,
        false,
      );

      return {
        __typename: 'Issue',
        ...issueResult,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  deleteIssue: async args => {
    const { id } = args;
    try {
      const issues = await deleteIssue('issues', id);
      return issues;
    } catch (err) {
      throw err;
    }
  },
  getIssues: async () => {
    try {
      const issues = await getIssues('issues');
      return issues;
    } catch (err) {
      throw err;
    }
  },
  importIssue: async args => {
    const { url } = args;
    try {
      // Parse issue url
      const { issueNumber, organization, repo } = formatIssueUrl(url);

      // Get issue detail from github API
      const { issueInput } = await getSingleIssue({
        issueNumber,
        organization,
        repo,
      });

      // Check issue repo for duplicate
      if (await checkDuplicateIssue('issues', issueInput.repo)) {
        throw new Error(`Issue at ${issueInput.repo} already exists`);
      }

      // Get organization detail from github API
      const { organizationInput } = await getSingleRepo({
        organization,
        repo,
      });

      // Return organizaiton ID if exists in db
      const [organizationData] = await getOrganizationsWhere(
        'repo_url',
        organizationInput.organizationRepo,
      );

      if (organizationData) {
        const { id } = organizationData;
        issueInput.organizationId = id;
      }

      const ImportData = { ...issueInput, ...organizationInput };

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
  oneIssue: async args => {
    const { id } = args;
    try {
      const [result] = await getOneIssue('issues', id);
      return {
        __typename: 'Issue',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  searchIssues: async args => {
    const { value } = args;
    try {
      const result = await searchIssues('issues', value);
      return result;
    } catch (err) {
      throw err;
    }
  },
  submitAccountPayment: async args => {
    try {
      const { issueId, fundValue, userId } = args;
      const [issueResult] = await submitAccountPaymentIssue(issueId, fundValue);
      const [userResult] = await submitAccountPaymentUser(userId, fundValue);
      const result = {
        balance: userResult.balance,
        fundedAmount: issueResult.funded_amount,
      };
      return {
        __typename: 'Payment',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  transformIssue: async args => {
    const { id, issueInput } = args;
    try {
      const data = {
        modified_date: new Date(), // update modified date
        organization_id: issueInput.organizationId,
        name: issueInput.name,
        body: issueInput.body,
        repo: issueInput.repo,
        language: issueInput.language,
        comments: issueInput.comments,
        attempting: issueInput.attempting,
        contributor_id: issueInput.contributorId,
        rep: issueInput.rep,
        watching: issueInput.watching,
        funded_amount: issueInput.fundedAmount,
        open: issueInput.open,
      };
      const queryResult = await transformIssue('issues', id, data);

      const result = {
        id: queryResult.id,
        createdDate: queryResult.created_date,
        modifiedDate: queryResult.modified_date,
        organizationId: issueInput.organization_id,
        name: queryResult.name,
        body: queryResult.body,
        repo: queryResult.repo,
        language: queryResult.language,
        comments: queryResult.comments,
        attempting: queryResult.attempting,
        contributorId: queryResult.contributor_id,
        rep: queryResult.rep,
        watching: queryResult.watching,
        fundedAmount: queryResult.funded_amount,
        open: queryResult.open,
      };

      const activityInput = {
        actionType: 'update',
        queryResult: result.organizationId,
        issueId: result.id,
        userId: result.contributorId,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Issue',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  updateIssueArray: async args => {
    const { id: issueId, column, data: userId, remove } = args;

    const [result] = await updateIssueArray(
      'issues',
      column,
      issueId,
      userId,
      remove,
    );

    const activityInput = {
      actionType: remove ? `remove_${column}` : `add_${column}`,
      issueId,
      organizationId: result.organization_id,
      userId,
    };
    await createActivity({ activityInput });

    return result;
  },
  upvoteIssue: async args => {
    const { id } = args;
    const [result] = await upvoteIssue(id);
    return result;
  },
};
