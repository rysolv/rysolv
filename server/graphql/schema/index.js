const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Issue {
    id: ID!
    title: String!
    description: String!
    createDate: String!
  }

  type IssueInput {
    title: String!
    description: String!
    createDate: String!
  }

  type RootQuery {
    issues: [Issue!]!
  }

  type RootMutation {
    createIssue(issueInput: String): Issue
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
