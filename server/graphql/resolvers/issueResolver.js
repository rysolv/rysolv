const { v4: uuidv4 } = require('uuid');
const {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
} = require('../../db');

module.exports = {
  createIssue: async args => {
    const { issueInput } = args;
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        issueInput.organization_id,
        issueInput.name,
        issueInput.body,
        issueInput.repo,
        issueInput.language,
        issueInput.comments || [],
        issueInput.attempts || 0,
        issueInput.active_attempts || 0,
        issueInput.contributor,
        issueInput.rep,
        issueInput.watch_list,
        issueInput.value,
      ],
    ];
    try {
      const result = await createIssue(issue);
      return result;
    } catch (err) {
      throw err;
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
        attempts: issueInput.attempts,
        active_attempts: issueInput.activeAttempts,
        contributor: issueInput.contributor,
        rep: issueInput.rep,
        watch_list: issueInput.watchList,
        value: issueInput.value,
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
        attempts: queryResult.attempts,
        activeAttempts: queryResult.active_attempts,
        contributor: queryResult.contributor,
        rep: queryResult.rep,
        watchList: queryResult.watchList,
        value: queryResult.value,
      };
      return result;
    } catch (err) {
      throw err;
    }
  },
};
