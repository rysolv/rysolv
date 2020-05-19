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

const { getSingleIssue } = require('../../integrations');

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
    issueInput.contributor || 'b519b064-b5db-4472-ad1b-00e30bdbfa4c', // contributor
    issueInput.rep || 25, // rep
    issueInput.watching || [], // watching
    issueInput.fundedAmount || 0, // funded_amount
    issueInput.open || true, // open
    issueInput.type || 'bug', // bug
  ],
];

const newOrganizationArray = (newIssueId, organizationInput) => [
  [
    uuidv4(), // id
    new Date(), // created_date
    new Date(), // modified_date
    organizationInput.organizationName, // name
    organizationInput.organizationDescription, // description
    organizationInput.organizationRepo, // repo
    organizationInput.organizationUrl || '', // url
    [newIssueId], // issues
    organizationInput.logo || defaultOrgImage, // logo
    organizationInput.verified || false, // verified
    [], // contributors
    organizationInput.contributor || 'b519b064-b5db-4472-ad1b-00e30bdbfa4c', // owner_id
    organizationInput.totalFunded || 0, // funded
    organizationInput.preferred_languages || [], // languages
  ],
];

module.exports = {
  createIssue: async args => {
    const { issueInput } = args;
    const newIssueId = uuidv4();

    // Check for duplicate issue
    await checkDuplicateIssue('issues', issueInput.repo);

    const createNewIssue = async () => {
      const issue = newIssueArray(newIssueId, issueInput);
      try {
        const result = await createIssue(issue);
        return result;
      } catch (err) {
        throw err;
      }
    };

    const createNewOrganization = async () => {
      // Check for duplicate organization
      if (
        await checkDuplicateOrganization(
          'organizations',
          issueInput.organizationRepo,
        )
      ) {
        throw new Error(
          `Error: Organization at ${
            issueInput.organizationRepo
          } already exists`,
        );
      }
      const [organization] = newOrganizationArray(issueInput);

      try {
        const [result] = await createOrganization(organization);
        return result;
      } catch (err) {
        throw err;
      }
    };

    if (!issueInput.organizationId) {
      const organizationResult = await createNewOrganization();
      issueInput.organizationId = organizationResult.id;
    }

    const [issueResult] = await createNewIssue();

    await updateOrganizationArray(
      'organizations',
      'issues',
      issueInput.organizationId,
      newIssueId,
      false,
    );

    await updateUserArray(
      'users',
      'issues',
      issueInput.contributor,
      issueResult.id,
      false,
    );
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
    const newIssueId = uuidv4();

    try {
      // get issue and organization detail from Github API
      const { issueInput, organizationInput } = await getSingleIssue(url);

      const createNewOrganization = async organizationArray => {
        try {
          const [result] = await createOrganization(organizationArray);
          return result;
        } catch (err) {
          throw err;
        }
      };

      const createNewIssue = async issueArray => {
        try {
          const result = await createIssue(issueArray);
          return result;
        } catch (err) {
          throw err;
        }
      };

      // check issue repo for duplicate
      if (await checkDuplicateIssue('issues', issueInput.repo)) {
        throw new Error(`Error: Issue at ${issueInput.repo} already exists`);
      }

      if (
        await checkDuplicateOrganization(
          'organizations',
          organizationInput.organizationRepo,
        )
      ) {
        // Organization exists: get org id, create issue, append issue to org list
        const [organization] = await getOrganizationsWhere(
          'organizations',
          'repo_url',
          organizationInput.organizationRepo,
        );

        const { id } = organization;

        issueInput.organizationId = id;

        const issueArray = newIssueArray(newIssueId, issueInput);

        const [newIssue] = await createNewIssue(issueArray);

        await updateOrganizationArray(
          'organizations',
          'issues',
          id,
          newIssueId,
          false,
        );

        return newIssue;
      }

      // Create organization, get org id, create issue
      const organizationArray = newOrganizationArray(
        newIssueId,
        organizationInput,
      );
      const newOrganization = await createNewOrganization(organizationArray);

      const { id } = newOrganization;

      issueInput.organizationId = id;

      const issueArray = newIssueArray(newIssueId, issueInput);

      const [newIssue] = await createNewIssue(issueArray);

      return newIssue;
    } catch (err) {
      throw err;
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
