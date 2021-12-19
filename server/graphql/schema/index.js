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

  type Bounty {
    createdDate: Object
    fundedAmount: Float
    id: ID
    isApproved: Boolean
    issueId: ID
    name: String
    pullRequestUrl: String
    rep: String
    repoName: String
    repoPayoutExists: Boolean
    userAccepted: Boolean
    userPayout: Float
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

  type Company {
    companyId: ID
    description: String
    location: String
    logo: String
    name: String
    size: String
    website: String
  }

  input CompanyInput {
    companyId: ID!
    description: String!
    location: String!
    logo: String
    name: String!
    size: String!
    website: String!
  }

  type CompanyPositionsArray {
    positions: [Position]
  }

  input ContactInput {
    body: String
    companyName: String
    companyUrl: String
    contactName: String
    email: String
    source: String
  }

  type Contract {
    body: String!
    key: String!
    subtitle: String!
    title: String!
    version: Int!
  }

  type Conversation {
    candidate: Object
    company: Object
    lastMessageDate: Object
    messages: [Object]
    position: Object
    threadId: ID
    unread: Boolean
  }

  type ConversationArray {
    conversations: [Conversation]
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
    isPullRequestMerged: Boolean
    isUserAccepted: Boolean
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

  type Message {
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

  input MessageInput {
    body: String!
    positionId: ID!
    threadId: ID
    toUserId: ID!
  }

  type MessageResponse {
    body: String!
    createdDate: Object!
    firstName: String!
    id: ID!
    lastName: String!
    profilePic: String!
    readDate: Object
    username: String!
    userId: ID!
  }

  type Payment {
    balance: Float
    fundedAmount: Float
    message: String
  }

  type Position {
    description: String
    experience: String
    id: String
    isOpen: String
    isRemote: String
    location: String
    role: [String]
    salary: String
    skills: [Object]
    title: String
    type: String
  }

  type PullRequest {
    createdDate: Object!
    exists: Boolean
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
    required: Boolean
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
    earnedBounties: Float
    exists: Boolean
    githubOwners: [String]
    id: ID!
    issues: [Object]
    logo: String
    maintainerProceeds: Float
    message: String
    modifiedDate: Object
    name: String
    organizationUrl: String
    ownerId: ID
    payoutUrl: String
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
    importUrl: String
    isManual: Boolean
    organizationUrl: String
    payoutMethod: String
    payoutUrl: String
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
    bounties: [Bounty]
    company: Object
    completedPullRequests: Int
    createdDate: Object
    dollarsEarned: Int
    email: String!
    emailVerified: Boolean
    firstName: String
    githubId: String
    githubLink: String
    githubUsername: String
    hiringStatus: String
    id: ID!
    isGithubVerified: Boolean
    isHired: Boolean
    isInterviewRequested: Boolean
    isSaved: Boolean
    issues: [Object]
    languages: [String]
    lastName: String
    lastPosition: String
    location: String
    matches: Int
    modifiedDate: Object
    notifications: Boolean
    percentMatch: Float
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    pullRequests: [String]
    receiveWeeklyEmails: Boolean
    rejectedPullRequests: Int
    rep: Int
    repos: [Object]
    salary: String
    stackoverflowLink: String
    surveyComplete: Boolean
    threadId: ID
    type: String
    unreadMessages: Int
    upvotes: [ID]
    username: String
    watching: [Object]
    yearsOfExperience: String
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
    isCompany: Boolean
    issues: [String]
    lastName: String
    password: String
    personalLink: String
    preferredLanguages: [String]
    profilePic: String
    receiveWeeklyEmails: Boolean
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
  union CompanyResult = Company | Error
  union ContractResult = Contract | Error
  union ConversationResult = ConversationArray | Error
  union EventResponse = Success | Error
  union FilterResult = Filter | Error
  union ImportPullRequestResult = ImportPullRequest | Error
  union ImportResult = ImportData | Error
  union IssueArrayResult = IssueArray | Error
  union IssueResult = Issue | Error
  union MessageResult = MessageResponse | Error
  union PaymentResult = Payment | Error
  union PositionResult = Position | Error
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
    getCompanyPositions(companyId: ID!): CompanyPositionsArray
    getFilterOptions: FilterResult!
    getGithubPullRequests(issueId: ID!): PullRequestArrayResult!
    getIssueAttemptList(issueId: ID!): [WatchList]!
    getIssueComments(issueId: ID!): [Comment]!
    getIssues: IssueArrayResult!
    getIssueWatchList(issueId: ID!): [WatchList]!
    getPositionCandidates(positionId: ID!): [User]
    getPullRequestList(issueId: ID): [PullRequestList]!
    getQuestions(category: String!): QuestionResult
    getRepoActivity(repoId: ID): [Activity]!
    getRepos: RepoArrayResult!
    getStats: StatsResult!
    getUserActivity(userId: ID): [Activity]!
    getUserDashboard: UserResult!
    getContract(plan: String!): ContractResult!
    getUserIssues: IssueArrayResult!
    getUserProfile(username: String!): UserResult!
    getUserPullRequests: PullRequestArrayResult!
    getUserRepos: RepoArrayResult!
    getUsers: UserArrayResult!
    getUserSettings: UserResult!
    getMessages: ConversationResult!

    githubSignIn(code: String!, origin: String!): UserResult!

    oneCompany(companyId: ID!): CompanyResult!
    oneIssue(id: ID!): IssueResult!
    onePosition(positionId: ID!): PositionResult!
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
    acceptBounty(fundingId: ID!, userRatio: Float!): EventResponse!

    addRepoPayout(repoId: ID!, repoInput: RepoInput): EventResponse!

    closeIssue(issueId: ID!, shouldClose: Boolean): EventResponse!

    createComment(commentInput: CommentInput): CommentResult!
    createIssue(issueInput: IssueInput): IssueResult!
    createMessage(messageInput: MessageInput): MessageResult!
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

    matchCandidates(positionId: ID!): EventResponse!

    postContractAccepted(companyId: ID, plan: String): EventResponse!
    postPositionResponse(companyId: ID, positionId: ID, responseArray: [Object]): EventResponse!
    postUserResponse(responseArray: [Object]): EventResponse!

    recruitingSignup(contactInput: ContactInput): EventResponse!

    sendContact(contactInput: ContactInput): EventResponse!

    setHiringStatus(hiringStatus: String!): EventResponse!
    setReadMessage(threadId: String!): EventResponse!

    signIn(password: String!, username: String!): SignInResult!
    signOut: EventResponse!

    submitAccountPayment(email: String!, issueId: ID!, fundValue: Float!): PaymentResult!

    toggleAttempting(issueId: ID!): ToggleAttemptingResult!
    toggleWatching(issueId: ID!): ToggleWatchingResult!

    transformCompany(companyInput: CompanyInput): EventResponse!
    transformIssue(issueId: ID!, issueInput: IssueInput): EventResponse!
    transformPosition(positionId: ID, responseArray: [Object]): EventResponse!
    transformRepo(repoId: ID!, repoInput: RepoInput): EventResponse!
    transformUser(userInput: UserInput): EventResponse!

    upvoteIssue(issueId: ID, upvote: Boolean): UpvoteResult!
    updatePaymentMethod: EventResponse!

    verifyUserAccount(code: String!): VerificationResult!
    verifyUserEmail(code: String!, email: String!, userId: ID!): EventResponse!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
