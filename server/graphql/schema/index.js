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
    activeAttempts: Int
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: [String]
    language: [String]
    name: String
    open: Boolean
    organizationId: String
    organizationName: String
    organizationVerified: Boolean
    profilePic: String
    rep: Int
    repo: String
    username: String
    value: Float
    watching: [String]
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
    pullRequests: [String]
    upvotes: [ID]
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
    pullRequests: [String]
    upvotes: [ID]
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
    totalFunded: Float
  }

  input OrganizationInput {
    name: String
    description: String
    repoUrl: String
    companyUrl: String
    logo: String
    verified: Boolean
  }

  type Error {
    message: String
  }

  union OrganizationResult = Organization | Error
  union IssueResult = Issue | Error

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

    updateIssueArray(id: ID, column: String, data: String, remove: Boolean): Issue!
    updateUserArray(id: ID, column: String, data: String, remove: Boolean): User!

    upvoteIssue(id: ID): Issue!
    userUpvote(id: ID): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
