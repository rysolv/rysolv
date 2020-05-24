const { v4: uuidv4 } = require('uuid');

const defaultOrgImage =
  'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png';

const {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  createIssue,
  createOrganization,
  deleteIssue,
  getIssues,
  getOneIssue,
  getOrganizationsWhere,
  searchIssues,
  transformIssue,
  updateIssueArray,
  updateOrganizationArray,
  updateUserArray,
  upvoteIssue,
} = require('../../db');

const { getSingleIssue, getSingleOrganization } = require('../../integrations');

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

const newOrganizationArray = organizationInput => [
  [
    uuidv4(), // id
    new Date(), // created_date
    new Date(), // modified_date
    organizationInput.organizationName, // name
    organizationInput.organizationDescription, // description
    organizationInput.organizationRepo, // repo
    organizationInput.organizationUrl || '', // url
    organizationInput.issues || [], // issues
    organizationInput.logo || defaultOrgImage, // logo
    organizationInput.verified || false, // verified
    [], // contributors
    organizationInput.contributor, // owner_id
    organizationInput.totalFunded || 0, // funded
    organizationInput.preferred_languages || [], // languages
  ],
];

module.exports = {
  createIssue: async args => {
    const { issueInput } = args;
    console.log(issueInput);
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

    // Populate organization array and create new organization
    const createNewOrganization = async () => {
      if (await checkDuplicateOrganization('organizations', organizationRepo)) {
        throw new Error(
          `Error: Organization at ${
            issueInput.organizationRepo
          } already exists`,
        );
      }
      const organizationArray = newOrganizationArray(issueInput);
      try {
        const [result] = await createOrganization(organizationArray);
        return result;
      } catch (err) {
        throw err;
      }
    };

    // Check for duplicate issue
    if (await checkDuplicateIssue('issues', repo)) {
      throw new Error(`Issue at ${repo} already exists`);
    }

    // Check for existing organization
    if (!organizationId) {
      const organizationResult = await createNewOrganization();
      issueInput.organizationId = organizationResult.id;
    }

    // Create new issue
    const [issueResult] = await createNewIssue();

    // add issue to organization
    await updateOrganizationArray(
      'organizations',
      'issues',
      issueInput.organizationId,
      newIssueId,
      false,
    );

    // add issue to user
    await updateUserArray(
      'users',
      'issues',
      issueInput.contributor,
      issueResult.id,
      false,
    );

    // add organization to user
    await updateUserArray(
      'users',
      'organizations',
      issueInput.contributor,
      issueInput.organizationId,
      false,
    );

    return issueResult;
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
      // get issue detail from Github API
      const {
        issueInput,
        issueInput: { organizationUrl },
      } = await getSingleIssue(url);

      // Check issue repo for duplicate
      if (await checkDuplicateIssue('issues', issueInput.repo)) {
        throw new Error(`Issue at ${issueInput.repo} already exists`);
      }

      // get organization detail from Github API
      const { organizationInput } = await getSingleOrganization(
        organizationUrl,
      );

      // Return organizaiton ID if exists in db
      const [organization] = await getOrganizationsWhere(
        'organizations',
        'repo_url',
        organizationInput.organizationRepo,
      );

      if (organization) {
        const { id } = organization;
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
        contributor: issueInput.contributor,
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
        name: queryResult.name,
        body: queryResult.body,
        repo: queryResult.repo,
        language: queryResult.language,
        comments: queryResult.comments,
        attempting: queryResult.attempting,
        contributor: queryResult.contributor,
        rep: queryResult.rep,
        watching: queryResult.watching,
        fundedAmount: queryResult.funded_amount,
        open: queryResult.open,
      };
      return result;
    } catch (err) {
      throw err;
    }
  },
  updateIssueArray: async args => {
    const { id, column, data, remove } = args;
    const [result] = await updateIssueArray('issues', column, id, data, remove);
    return result;
  },
  upvoteIssue: async args => {
    const { id } = args;
    const [result] = await upvoteIssue('issues', id);
    return result;
  },
};
