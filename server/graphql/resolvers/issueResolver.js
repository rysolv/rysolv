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
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        args.issueInput.name,
        args.issueInput.body,
        args.issueInput.repo,
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
    const { id } = args;
    try {
      console.log(args);
      const issues = await transformIssue('issues', id);
      console.log(issues);
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
