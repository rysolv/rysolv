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
    profilePic: String
    pullRequestId: ID
    pullRequestName: String
    pullRequestUrl: String
    repoId: ID
    repoName: String
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

  type Filter {
    bugTag: Int
    closedIssues: Int
    featureTag: Int
    fundedIssues: Int
    issueLanguages: [Object]
    maxBounty: Float
    maxRepoFunded: Float
    repoLanguages: [Object]
    repos: [Object]
    unfundedIssues: Int
    userLanguages: [Object]
  }

  type ImportData {
    githubCommentCount: Int
    issueBody: String!
    issueLanguages: [String]
    issueName: String!
    issueUrl: String!
    organizationUrl: String
    repoDescription: String
    repoId: ID
    repoLanguages: [String]
    repoLogo: String
    repoName: String
    repoUrl: String
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
    awardedUser: Object
    body: String
    comments: Int
    contributor: [String]
    createdDate: Object
    exists: Boolean
    fundedAmount: Float
    id: ID
    isInFundingQueue: Boolean
    isPullRequestMerged: Boolean
    language: [String]
    message: String
    modifiedDate: Object
    name: String
    open: Boolean
    pullRequests: Int
    rep: Int
    repo: String
    repoId: String
    repoName: String
    repoVerified: Boolean
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
    organizationUrl: String
    rep: Int
    repo: String
    repoDescription: String
    repoId: String
    repoLogo: String
    repoName: String
    repoUrl: String
    type: String
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

  type Question {
    id: ID
    limit: Int
    questionKey: String
    questionText: String
    responses: [QuestionResponse]
    subtext: String
  }

  type QuestionArray {
    questionArray: [Question]
  }

  type QuestionResponse {
    id: ID
    responseKey: String
    value: String
  }

  type Repo {
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

  type RepoArray {
    repos: [Repo]
  }

  input RepoInput {
    identiconId: ID
    isManual: Boolean
    organizationUrl: String
    repoDescription: String
    repoLanguages: [String]
    repoLogo: String
    repoName: String
    repoUrl: String
    repoVerified: Boolean
  }

  type Stats {
    mostContribution: [Object]!
    mostEarned: [Object]!
    mostRep: [Object]!
    totalAvailable: Float!
    totalEarned: Float!
    totalFunded: Float!
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
    completedPullRequests: Int
    createdDate: Object
    dollarsEarned: Int
    email: String!
    emailVerified: Boolean
    firstName: String
    githubLink: String
    githubUsername: String
    id: ID!
    isGithubVerified: Boolean
    isQuestionnaireComplete: Boolean
    issues: [Object]
    lastName: String
    modifiedDate: Object
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    rejectedPullRequests: Int
    rep: Int
    repos: [Object]
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
    dollarsEarned: Int
    email: String
    emailVerified: Boolean
    firstName: String
    githubLink: String
    id: ID
    issues: [String]
    lastName: String
    password: String
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    rep: Int
    repos: [String]
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
  union FilterResult = Filter | Error
  union ImportPullRequestResult = ImportPullRequest | Error
  union ImportResult = ImportData | Error
  union IssueArrayResult = IssueArray | Error
  union IssueResult = Issue | Error
  union PaymentResult = Payment | Error
  union PullRequestArrayResult = PullRequestArray | Error
  union QuestionResult = QuestionArray | Error
  union RepoArrayResult = RepoArray | Error
  union RepoResult = Repo | Error
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
    getFilterOptions: FilterResult!
    getIssueAttemptList(issueId: ID!): [WatchList]!
    getIssueComments(issueId: ID!): [Comment]!
    getIssues: IssueArrayResult!
    getIssueWatchList(issueId: ID!): [WatchList]!
    getPullRequestList(issueId: ID): [PullRequestList]!
    getQuestions(category: String!): QuestionResult
    getRepoActivity(repoId: ID): [Activity]!
    getRepos: RepoArrayResult!
    getStats: StatsResult!
    getUserActivity(userId: ID): [Activity]!
    getUserIssues: IssueArrayResult!
    getUserPullRequests: PullRequestArrayResult!
    getUserRepos: RepoArrayResult!
    getUsers: UserArrayResult!
    getUserSettings: UserResult!

    githubSignIn(code: String!, origin: String!): UserResult!

    oneIssue(id: ID!): IssueResult!
    oneRepo(id: ID!): RepoResult!
    oneUser(userId: ID!): UserResult!
    oneUserSignUp(email: String!): UserResult!

    resendCode(email: String!): EventResponse!

    resetPassword(code: String!, email: String!, password: String!): EventResponse!

    searchIssues(value: String!): [Issue]!
    searchRepos(value: String!): [Repo]!
    searchUsers(value: String!): [User]!

    sendLink(email: String!): EventResponse!
  }

  type RootMutation {
    closeIssue(issueId: ID!, shouldClose: Boolean): EventResponse!

    createComment(commentInput: CommentInput): CommentResult!
    createIssue(issueInput: IssueInput): IssueResult!
    createPaypalPayment(amount: Float!, email: String, issueId: ID): PaymentResult!
    createPullRequest(pullRequestInput: PullRequestInput!): EventResponse!
    createRepo(repoInput: RepoInput): RepoResult!
    createStripeCharge(amount: Float!, email: String, issueId: ID, token: String!): PaymentResult!
    createUser(userInput: UserInput): UserResult!
    createWithdrawal(email: String!, transferValue: Float!): WithdrawalResult!

    deletePullRequest(id:ID!): EventResponse!
    deleteUser: EventResponse!

    importIssue(url: String!): ImportResult!
    importPullRequest(issueId: ID!, url: String!): ImportPullRequestResult!
    importRepo(url: String!): ImportResult!

    postUserResponse(responseArray: [Object]): EventResponse!

    signIn(password: String!, username: String!): SignInResult!
    signOut: EventResponse!

    submitAccountPayment(email: String!, issueId: ID!, fundValue: Float!): PaymentResult!

    toggleAttempting(issueId: ID!): ToggleAttemptingResult!
    toggleWatching(issueId: ID!): ToggleWatchingResult!

    transformIssue(issueId: ID!, issueInput: IssueInput): EventResponse!
    transformRepo(repoId: ID!, repoInput: RepoInput): EventResponse!
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
