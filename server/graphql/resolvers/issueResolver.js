const { v4: uuidv4 } = require('uuid');
const {
  createIssue,
  getIssues,
  getOneIssue,
  deleteIssue,
  transformIssue,
} = require('../../db');

module.exports = {
  issues: async () => {
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
      const issues = await getOneIssue('issues', id);
      return issues;
    } catch (err) {
      throw err;
    }
  },
  createIssue: async args => {
    const { issueInput } = args;
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        issueInput.name,
        issueInput.body,
        issueInput.repo,
      ],
    ];
    try {
      const result = await createIssue(issue);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformIssue: async args => {
    const { id, issueInput } = args;
    try {
      const data = [
        [new Date(), issueInput.name, issueInput.body, issueInput.repo],
      ];
      const issues = await transformIssue('issues', id, data);
      return issues;
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
};
