const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Comment {
    commentId: ID
    createdDate: Object
    modifiedDate: Object
    target: String
    body: String
    userId: ID
    username: String
    profilePic: String
  }

  type Issue {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    organizationId: String
    name: String
    body: String
    repo: String
    language: String
    comments: [ID]
    attempts: Int
    activeAttempts: Int
    contributor: [String]
    rep: Int
    watchList: [String]
    value: Int
    open: Boolean
  }

  input IssueInput {
    organizationId: String
    name: String
    body: String
    repo: String
    language: String
    comments: [ID]
    attempts: Int
    activeAttempts: Int
    contributor: [String]
    rep: Int
    watchList: [String]
    value: Int
  }

  type User {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    firstName: String!
    lastName: String!
    email: String!
    watchingList: [String]
    rep: Int
    profilePic: String
    activeNumber: [String]
    issuesNumber: [String]
    username: String
    githubLink: String
    personalLink: String
    preferredLanguages: String
    stackoverflowLink: String
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    watchingList: [String]
    rep: Int
    profilePic: String
    activeNumber: [String]
    issuesNumber: [String]
    username: String
    githubLink: String
    personalLink: String
    preferredLanguages: String
    stackoverflowLink: String
  }

  type Organization {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    name: String!
    description: String!
    repoUrl: String!
    companyUrl: String
    issues: [Object]
    logo: String
    verified: Boolean
    contributors: [Object]
    ownerId: ID
  }

  type Error {
    message: String
  }

  union OrganizationResult = Organization | Error
  union IssueResult = Issue | Error

  input OrganizationInput {
    name: String
    description: String
    repoUrl: String
    companyUrl: String
    issues: [String]
    logo: String
    verified: Boolean
  }

  type RootQuery {
    getIssues: [Issue!]!
    getUsers: [User!]!
    getOrganizations: [Organization!]!
    getComments: [Comment]

    issueComments(id: ID!): [Comment]

    oneIssue(id: ID!): IssueResult
    oneUser(id: ID!): User!
    oneOrganization(id: ID!): OrganizationResult

    searchIssues(value: String!): [Issue!]!
    searchOrganizations(value: String!): [Organization!]!
    searchUsers(value: String!): [User!]!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    createUser(userInput: UserInput): [User!]!
    createOrganization(organizationInput: OrganizationInput): [Organization!]!

    deleteIssue(id: ID!): String!
    deleteUser(id:ID!): String!
    deleteOrganization(id:ID!): String!

    transformIssue(id: ID!, issueInput: IssueInput): Issue!
    transformUser(id: ID!, userInput: UserInput): User!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): Organization!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
