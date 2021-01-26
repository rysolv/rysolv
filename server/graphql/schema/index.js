const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Activity {
    actionType: String
    activityId: ID
    createdDate: Object
    fundedValue: Float
    issueId: ID
    issueName: String
    organizationId: ID
    organizationName: String
    profilePic: String
    pullRequestId: ID
    pullRequestName: String
    pullRequestUrl: String
    userId: ID
    username: String
  }

  type AttemptingArray {
    issueArray: [AttemptingDetail]
    userArray: [ID]
  }

  type AttemptingDetail {
    fundedAmount: Float
    id: ID
    name: String
  }

  type Comment {
    body: String
    commentId: ID
    createdDate: Object
    githubUrl: String
    isGithubComment: Boolean
    modifiedDate: Object
    profilePic: String
    target: String
    userId: ID
    username: String
  }

  input CommentInput {
    body: String!
    target: ID!
  }

  type Error {
    message: String
  }

  type ImportData {
    githubCommentCount: Int
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

  type ImportPullRequest {
    githubUsername: String
    htmlUrl: String
    mergeable: Boolean
    mergeableState: String
    merged: Boolean
    open: Boolean
    pullNumber: Int
    title: String
  }

  type Issue {
    attempting: [ID]
    body: String
    comments: Int
    contributor: [String]
    createdDate: Object
    exists: Boolean
    fundedAmount: Float
    id: ID!
    language: [String]
    message: String
    modifiedDate: Object
    name: String
    open: Boolean
    organizationId: String
    organizationName: String
    organizationVerified: Boolean
    pullRequests: Int
    rep: Int
    repo: String
    type: String
    userId: ID
    username: String
    watching: [ID]
  }

  type IssueArray {
    issues: [Issue]
  }

  input IssueInput {
    body: String
    fundedAmount: Int
    githubCommentCount: Int
    identiconId: ID
    isManual: Boolean
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
    type: String
  }

  type Organization {
    contributors: [Object]
    createdDate: Object
    description: String
    exists: Boolean
    id: ID!
    issues: [Object]
    logo: String
    message: String
    modifiedDate: Object
    name: String
    organizationUrl: String
    ownerId: ID
    preferredLanguages: [String]
    repoUrl: String
    totalFunded: Float
    verified: Boolean
  }

  type OrganizationArray {
    organizations: [Organization]
  }

  input OrganizationInput {
    identiconId: ID
    isManual: Boolean
    organizationDescription: String
    organizationLanguages: [String]
    organizationLogo: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
    organizationVerified: Boolean
  }

  type Payment {
    balance: Float
    fundedAmount: Float
    message: String
  }

  type PullRequest {
    createdDate: Object!
    fundedAmount: Float
    githubUsername: String
    htmlUrl: String
    issueId: ID!
    issueName: String
    mergeable: Boolean
    mergeableState: String
    merged: Boolean
    modifiedDate: Object!
    open: Boolean!
    pullNumber: Int
    pullRequestId: ID!
    title: String!
    userId: ID!
  }

  type PullRequestArray {
    pullRequestArray: [PullRequest]
  }

  input PullRequestInput {
    githubUsername: String
    htmlUrl: String
    issueId: ID!
    mergeable: Boolean
    mergeableState: String
    merged: Boolean
    open: Boolean!
    pullNumber: Int
    title: String!
  }

  type PullRequestList {
    htmlUrl: String
    pullRequestId: ID
    rep: Int
    title: String
    userId: ID
    username: String
  }

  type Stats {
    mostContribution: [Object]!
    mostEarned: [Object]!
    mostRep: [Object]!
    totalAvailable: Int!
    totalEarned: Int!
    totalFunded: Int!
    totalResolved: Int!
  }

  type Success {
    message: String
  }

  type Upvote {
    issueRep: Int
    upvotes: [ID]
    userRep: Int
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
    emailVerified: Boolean
    firstName: String!
    githubLink: String
    githubUsername: String
    id: ID!
    isGithubVerified: Boolean
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

  type UserArray {
    users: [User]
  }

  input UserInput {
    attempting: [ID]
    balance: Float
    comments: [String]
    dollarsEarned: Int
    email: String
    emailVerified: Boolean
    firstName: String
    githubLink: String
    id: ID
    issues: [String]
    lastName: String
    organizations: [String]
    password: String
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rep: Int
    stackoverflowLink: String
    upvotes: [ID]
    username: String
    watching: [String]
  }

  type Verification {
    githubUsername: String
    isGithubVerified: Boolean
    message: String
  }

  type WatchList {
    id: ID
    profilePic: String
    username: String
  }

  type WatchListArray {
    issueArray: [WatchListDetail]
    userArray: [ID]
  }

  type WatchListDetail {
    fundedAmount: Float
    id: ID
    name: String
  }

  type Withdrawal {
    balance: Float
    message: String
  }

  union CommentResult = Comment | Error
  union EventResponse = Success | Error
  union ImportPullRequestResult = ImportPullRequest | Error
  union ImportResult = ImportData | Error
  union IssueArrayResult = IssueArray | Error
  union IssueResult = Issue | Error
  union OrganizationArrayResult = OrganizationArray | Error
  union OrganizationResult = Organization | Error
  union PaymentResult = Payment | Error
  union PullRequestArrayResult = PullRequestArray | Error
  union SignInResult = User | Error
  union StatsResult = Stats | Error
  union ToggleAttemptingResult = AttemptingArray | Error
  union ToggleWatchingResult = WatchListArray | Error
  union UpvoteResult = Upvote | Error
  union UserArrayResult = UserArray | Error
  union UserResult = User | Error
  union VerificationResult = Verification | Error
  union WithdrawalResult = Withdrawal | Error

  type RootQuery {
    getIssueAttemptList(issueId: ID!): [WatchList]!
    getIssueComments(issueId: ID!): [Comment]!
    getIssues: IssueArrayResult!
    getIssueWatchList(issueId: ID!): [WatchList]!
    getOrganizationActivity(organizationId: ID): [Activity]!
    getOrganizations: OrganizationArrayResult!
    getPullRequestList(issueId: ID): [PullRequestList]!
    getStats: StatsResult!
    getUserActivity(userId: ID): [Activity]!
    getUserIssues: IssueArrayResult!
    getUserPullRequests: PullRequestArrayResult!
    getUserRepos: OrganizationArrayResult!
    getUsers: UserArrayResult!
    getUserSettings: UserResult!

    githubSignIn(code: String!, isSignIn: Boolean!): UserResult!

    oneIssue(id: ID!): IssueResult!
    oneOrganization(id: ID!): OrganizationResult!
    oneUser(userId: ID!): UserResult!
    oneUserSignUp(email: String!): UserResult!

    resetPassword(code: String!, email: String!, password: String!): EventResponse!

    searchIssues(value: String!): [Issue]!
    searchOrganizations(value: String!): [Organization]!
    searchUsers(value: String!): [User]!

    sendLink(email: String!): EventResponse!
  }

  type RootMutation {
    closeIssue(issueId: ID!, shouldClose: Boolean): EventResponse!

    createComment(commentInput: CommentInput): CommentResult!
    createIssue(issueInput: IssueInput): IssueResult!
    createOrganization(organizationInput: OrganizationInput): OrganizationResult!
    createPaypalPayment(amount: Float!, email: String, issueId: ID): PaymentResult!
    createPullRequest(pullRequestInput: PullRequestInput!): EventResponse!
    createStripeCharge(amount: Float!, email: String, issueId: ID, token: String!): PaymentResult!
    createUser(userInput: UserInput): UserResult!
    createWithdrawal(email: String!, transferValue: Float!): WithdrawalResult!

    deletePullRequest(id:ID!): EventResponse!
    deleteUser: EventResponse!

    importIssue(url: String!): ImportResult!
    importOrganization(url: String!): ImportResult!
    importPullRequest(issueId: ID!, url: String!): ImportPullRequestResult!

    signIn(password: String!, username: String!): SignInResult!
    signOut: EventResponse!

    submitAccountPayment(email: String!, issueId: ID!, fundValue: Float!): PaymentResult!

    toggleAttempting(issueId: ID!): ToggleAttemptingResult!
    toggleWatching(issueId: ID!): ToggleWatchingResult!

    transformIssue(issueId: ID!, issueInput: IssueInput): EventResponse!
    transformOrganization(organizationId: ID!, organizationInput: OrganizationInput): EventResponse!
    transformUser(userInput: UserInput): EventResponse!

    upvoteIssue(issueId: ID, upvote: Boolean): UpvoteResult!

    verifyUserAccount(code: String!): VerificationResult!
    verifyUserEmail(code: String!, email: String!, userId: ID!): EventResponse!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
