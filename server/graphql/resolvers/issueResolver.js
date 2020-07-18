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

const newIssueObject = (issueId, issueInput) => ({
  attempting: issueInput.attempting || [], // attempting
  body: issueInput.body, // body
  comments: issueInput.comments || [], // comments
  contributor_id: issueInput.contributor, // contributor
  created_date: new Date(), // created_date
  funded_amount: issueInput.fundedAmount || 0, // funded_amount
  id: issueId, // id
  language: issueInput.language || [], // language
  modified_date: new Date(), // modified_data
  name: issueInput.name, // name
  open: issueInput.open || true, // open
  organization_id: issueInput.organizationId, // organization_id
  rep: issueInput.rep || 25, // rep
  repo: issueInput.repo, // repo
  type: issueInput.type || 'bug', // bug
  watching: issueInput.watching || [], // watching
});

const newOrganizationObject = organizationInput => ({
  contributors: [], // contributors
  created_date: new Date(), // created_date
  description: organizationInput.organizationDescription, // description
  id: uuidv4(), // id
  issues: organizationInput.issues || [], // issues
  logo: organizationInput.organizationLogo || defaultOrgImage, // logo
  modified_date: new Date(), // modified_date
  name: organizationInput.organizationName, // name
  organization_url: organizationInput.organizationUrl || '', // url
  owner_id: organizationInput.contributor, // owner_id
  preferred_languages: organizationInput.preferred_languages || [], // languages
  repo_url: organizationInput.organizationRepo, // repo
  total_funded: organizationInput.totalFunded || 0, // funded
  verified: organizationInput.verified || false, // verified
});

module.exports = {
  closeIssue: async args => {
    const { id, shouldClose } = args;
    try {
      const response = await closeIssue(id, shouldClose);

      const [result] = await getOneIssue(id);

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

    // Populate issue object and create new issue
    const createNewIssue = async () => {
      const issueObject = newIssueObject(newIssueId, issueInput);
      try {
        const result = await createIssue(issueObject);
        return result;
      } catch (err) {
        throw err;
      }
    };
    // **********

    // Populate organization object and create new organization
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
    // **********

    try {
      // Check for duplicate issue
      if (await checkDuplicateIssue(repo)) {
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
      await updateUserArray({
        column: 'issues',
        data: issueResult.id,
        userId: issueInput.contributor,
      });

      // add organization to user list
      await updateUserArray({
        column: 'organizations',
        data: issueInput.organizationId,
        userId: issueInput.contributor,
      });

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
      const issues = await deleteIssue(id);
      return issues;
    } catch (err) {
      throw err;
    }
  },
  getIssues: async () => {
    try {
      const issues = await getIssues();
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
      if (await checkDuplicateIssue(issueInput.issueUrl)) {
        throw new Error(`Issue at ${issueInput.issueUrl} already exists`);
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
      const [result] = await getOneIssue(id);
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
      const result = await searchIssues(value);
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
      const result = await transformIssue(id, data);

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

    const [result] = await updateIssueArray(column, issueId, userId, remove);

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
