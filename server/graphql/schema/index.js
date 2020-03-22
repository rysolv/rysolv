const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Issue {
    id: ID!
    created_date: Object
    modified_date: Object
    organization: String!
    name: String!
    body: String!
    repo: String!
  }

  input IssueInput {
    organization: String!
    name: String!
    body: String!
    repo: String!
  }

  type RootQuery {
    issues: [Issue!]!
    oneIssue(id: ID!): [Issue!]!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    deleteIssue(id: ID!): [Issue!]!
    transformIssue(id: ID!, issueInput: IssueInput): [Issue!]!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
