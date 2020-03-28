const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Issue {
    id: ID!
    created_date: Object
    modified_date: Object
    organization: String!
    organization_id: String!
    name: String!
    body: String!
    repo: String!
    language: String!
    comments: [ID]!
    attempts: Int!
    active_attempts: Int!
    contributor: [String]!
    rep: Int!
    watch_list: [String]!
    value: Int!
  }

  input IssueInput {
    organization: String!
    organization_id: String!
    name: String!
    body: String!
    repo: String!
    language: String
    comments: [ID]
    attempts: Int
    active_attempts: Int
    contributor: [String]
    rep: Int
    watch_list: [String]
    value: Int!
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
    profile_pic: String
  }

  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    watching_list: [String]
    rep: Int
    profile_pic: String
  }

  type Organization {
    id: ID!
    created_date: Object
    modified_date: Object
    name: String!
    description: String!
    repo_url: String!
    website: String
    issues: [String]
    logo: String
    verified: Boolean
  }

  input OrganizationInput {
    name: String!
    description: String!
    repo_url: String!
    website: String
    issues: [String]
    logo: String
    verified: Boolean
  }

  type RootQuery {
    getIssues: [Issue!]!
    getUsers: [User!]!
    getOrganizations: [Organization!]!

    oneIssue(id: ID!): Issue!
    oneUser(id: ID!): User!
    oneOrganization(id: ID!): Organization!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    createUser(userInput: UserInput): [User!]!
    createOrganization(organizationInput: OrganizationInput): [Organization!]!

    deleteIssue(id: ID!): String!
    deleteUser(id:ID!): String!
    deleteOrganization(id:ID!): String!

    transformIssue(id: ID!, issueInput: IssueInput): [Issue!]!
    transformUser(id: ID!, userInput: UserInput): [User!]!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): [Organization!]!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
