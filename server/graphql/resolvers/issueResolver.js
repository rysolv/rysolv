const { v4: uuidv4 } = require('uuid');

const {
  createIssue,
  createOrganization,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  updateUserArray,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
} = require('../../db');

module.exports = {
  createIssue: async args => {
    const { issueInput } = args;
    const newIssueId = uuidv4();

    const createNewIssue = async () => {
      const issue = [
        [
          newIssueId,
          new Date(),
          new Date(),
          issueInput.organizationId,
          issueInput.name,
          issueInput.body,
          issueInput.repo,
          issueInput.language || [],
          issueInput.comments || [],
          issueInput.attempting || [],
          issueInput.contributor || '',
          issueInput.rep || 25,
          issueInput.watching || [],
          issueInput.fundedAmount || 0,
          issueInput.open || true,
          issueInput.type || 'bug',
        ],
      ];
      try {
        const result = await createIssue(issue);
        return result;
      } catch (err) {
        throw err;
      }
    };

    const createNewOrganization = async () => {
      const organization = [
        [
          uuidv4(),
          new Date(),
          new Date(),
          issueInput.organizationName,
          issueInput.organizationDescription,
          issueInput.organizationRepo,
          issueInput.organizationUrl || '',
          [newIssueId],
          issueInput.logo ||
            'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png',
          issueInput.verified || false,
          [issueInput.contributor] || [],
          issueInput.contributor || '',
          issueInput.totalFunded || 0,
          issueInput.preferred_languages || [],
        ],
      ];
      try {
        const [result] = await createOrganization(organization);
        return result;
      } catch (err) {
        throw err;
      }
    };

    if (args.organizationId) {
      const result = await createNewIssue();
      // todo: add issue to org
      return result;
    }
    const organizationResult = await createNewOrganization();
    issueInput.organizationId = organizationResult.id;
    const [issueResult] = await createNewIssue();
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
