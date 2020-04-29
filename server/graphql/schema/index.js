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

  input CommentInput {
    body: String!
    target: ID!
    user: ID!
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
    attempting: [ID]
    attempts: Int
    activeAttempts: Int
    contributor: [String]
    rep: Int
    watching: [String]
    value: Float
    open: Boolean
  }

  input IssueInput {
    organizationId: String
    name: String
    body: String
    repo: String
    language: String
    comments: [ID]
    attempting: [ID]
    attempts: Int
    activeAttempts: Int
    contributor: [String]
    rep: Int
    watching: [String]
    value: Int
  }

  type User {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    firstName: String!
    lastName: String!
    email: String!
    watching: [String]
    rep: Int
    profilePic: String
    comments: [String]
    attempting: [ID]
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
    watching: [String]
    rep: Int
    profilePic: String
    comments: [String]
    attempting: [ID]
    issuesNumber: [String]
    username: String
    githubLink: String
    personalLink: String
    preferredLanguages: [String]
    stackoverflowLink: String
  }

  type Organization {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    name: String!
    description: String!
    repoUrl: String!
    organizationUrl: String
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
    organizationUrl: String
    logo: String
    verified: Boolean
  }

  type RootQuery {
    getIssues: [Issue!]!
    getUsers: [User!]!
    getOrganizations: [Organization!]!
    getComments: [Comment]

    getIssueComments(id: ID!): [Comment]

    oneIssue(id: ID!): IssueResult
    oneUser(column: String!, query: String!): User!
    oneOrganization(id: ID!): OrganizationResult

    searchIssues(value: String!): [Issue!]!
    searchOrganizations(value: String!): [Organization!]!
    searchUsers(value: String!): [User!]!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    createUser(userInput: UserInput): [User!]!
    createOrganization(organizationInput: OrganizationInput): [Organization!]!
    createComment(commentInput: CommentInput): Comment

    deleteIssue(id: ID!): String!
    deleteUser(id:ID!): String!
    deleteOrganization(id:ID!): String!

    transformIssue(id: ID!, issueInput: IssueInput): Issue!
    transformUser(id: ID!, userInput: UserInput): User!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): Organization!

    updateIssueArray(id: ID, column: String, data: String): Issue!
    updateUserArray(id: ID, column: String, data: String): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
