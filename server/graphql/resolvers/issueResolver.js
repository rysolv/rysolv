const { pool, createIssue, getIssues } = require('../../db');

console.log('create issue function');
console.log(createIssue, pool, getIssues);

module.exports = {
  issues: async () => {
    try {
      const issue = [
        {
          id: Math.random().toString(),
          title: 'title',
          description: 'description',
          createDate: new Date().toISOString(),
        },
        {
          id: Math.random().toString(),
          title: 'Another issue',
          description: 'more different description',
          createDate: new Date().toISOString(),
        },
      ];
      console.log('Some list of issues');
      return issue;
    } catch (err) {
      throw err;
    }
  },
  createIssue: async args => {
    try {
      const issue = {
        id: Math.random().toString(),
        title: 'title',
        description: 'description',
        createDate: new Date().toISOString(),
      };
      console.log(args);
      return issue;
    } catch (err) {
      throw err;
    }
  },
  updateIssue: async args => {
    try {
      const newIssue = {
        id: Math.random().toString(),
        title: 'title',
        description: 'description',
        createDate: new Date().toISOString(),
      };
      console.log(args);
      return newIssue;
    } catch (err) {
      throw err;
    }
  },
};
