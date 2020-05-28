const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Comment {
    body: String
    commentId: ID
    createdDate: Object
    modifiedDate: Object
    profilePic: String
    target: String
    userId: ID
    username: String
  }

  input CommentInput {
    body: String!
    target: ID!
    user: ID!
  }

  type Issue {
    activeAttempts: Int
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: [String]
    createdDate: Object
    fundedAmount: Float
    id: ID!
    language: [String]
    modifiedDate: Object
    name: String
    open: Boolean
    organizationId: String
    organizationName: String
    organizationVerified: Boolean
    profilePic: String
    rep: Int
    repo: String
    type: String
    userId: ID
    username: String
    watching: [String]
  }

  type ImportData {
    issueBody: String!
    issueLanguages: [String]
    issueName: String!
    issueUrl: String!
    organizationDescription: String
    organizationId: ID
    organizationLanguages: [String]
    organizationLogo: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
  }

  input IssueInput {
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: String
    fundedAmount: Int
    language: [String]
    name: String
    organizationDescription: String
    organizationId: String
    organizationLogo: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
    rep: Int
    repo: String
    watching: [String]
  }

  type User {
    activePullRequests: Int
    attempting: [Object]
    balance: Float
    comments: [String]
    completedPullRequests: Int
    createdDate: Object
    dollarsEarned: Int
    email: String!
    firstName: String!
    githubLink: String
    id: ID!
    isOnline: Boolean
    issues: [Object]
    lastName: String!
    modifiedDate: Object
    organizations: [Object]
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rejectedPullRequests: Int
    rep: Int
    stackoverflowLink: String
    upvotes: [ID]
    username: String
    watching: [Object]
  }

  input UserInput {
    activePullRequests: Int
    attempting: [ID]
    balance: Float
    comments: [String]
    completedPullRequests: Int
    dollarsEarned: Int
    email: String
    firstName: String
    githubLink: String
    isOnline: Boolean
    issues: [String]
    lastName: String
    organizations: [String]
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rejectedPullRequests: Int
    rep: Int
    stackoverflowLink: String
    upvotes: [ID]
    username: String
    watching: [String]
  }

  type WatchList {
    id: ID
    Amount: Float
    Issue: String
    profilePic: String
    User: String
  }

  type Organization {
    contributors: [Object]
    createdDate: Object
    description: String!
    id: ID!
    issues: [Object]
    logo: String
    modifiedDate: Object
    name: String!
    organizationUrl: String
    ownerId: ID
    preferredLanguages: [String]
    repoUrl: String!
    totalFunded: Float
    verified: Boolean
  }

  input OrganizationInput {
    organizationDescription: String
    organizationLogo: String
    organizationName: String
    organizationUrl: String
    organizationRepo: String
    organizationVerified: Boolean
  }

  type Error {
    message: String
  }

  union IssueResult = Issue | Error
  union OrganizationResult = Organization | Error
  union ImportResult = ImportData | Error

  type RootQuery {
    getComments: [Comment]
    getIssues: [Issue!]!
    getOrganizations: [Organization!]!
    getUsers: [User!]!

    getIssueComments(id: ID!): [Comment]
    getUserOrganizations(id: ID!): [Organization!]

    getWatchList(idArray: [ID!], type: String!): [WatchList!]

    oneIssue(id: ID!): IssueResult
    oneOrganization(id: ID!): OrganizationResult
    oneUser(column: String!, query: ID!): User!

    searchIssues(value: String!): [Issue!]!
    searchOrganizations(value: String!): [Organization!]!
    searchUsers(value: String!): [User!]!
  }

  type RootMutation {
    createComment(commentInput: CommentInput): Comment
    createIssue(issueInput: IssueInput): Issue!
    createOrganization(organizationInput: OrganizationInput): [Organization!]!
    createUser(userInput: UserInput): [User!]!

    deleteIssue(id: ID!): String!
    deleteOrganization(id:ID!): String!
    deleteUser(id:ID!): String!

    importIssue(url: String!): ImportResult
    importOrganization(url: String!): ImportResult

    transformIssue(id: ID!, issueInput: IssueInput): Issue!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): Organization!
    transformUser(id: ID!, userInput: UserInput): User!

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
