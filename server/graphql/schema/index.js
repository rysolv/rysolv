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
    language: String
    comments: [ID]
    attempts: Int
    active_attempts: Int
    contributor: [String]
  }

  input IssueInput {
    organization: String!
    name: String!
    body: String!
    repo: String!
    language: String
    comments: [ID]
    attempts: Int
    active_attempts: Int
    contributor: [String]
  }

  type User {
    id: ID!
    created_date: Object
    modified_date: Object
    first_name: String!
    last_name: String!
    email: String!
    watching_list: [String]
    rep: Int
  }

  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    watching_list: [String]
    rep: Int
  }

  type RootQuery {
    getIssues: [Issue!]!
    oneIssue(id: ID!): [Issue!]!
    oneUser(id: ID!): [User!]!
    getUsers: [User!]!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    createUser(userInput: UserInput): [User!]!
    deleteIssue(id: ID!): String!
    deleteUser(id:ID!): String!
    transformIssue(id: ID!, issueInput: IssueInput): [Issue!]!
    transformUser(id: ID!, userInput: UserInput): [User!]!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
