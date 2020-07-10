const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicateUser,
  createUser,
  deleteUser,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOrganizationsWhere,
  getUsers,
  getWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
  userUpvote,
} = require('../../db');

module.exports = {
  createUser: async args => {
    const { userInput } = args;
    await checkDuplicateUser('users', userInput.email);
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        userInput.firstName,
        userInput.lastName,
        userInput.email,
        userInput.watching || [],
        userInput.rep || 0,
        userInput.profilePic,
        userInput.comments || [],
        userInput.attempting || [],
        userInput.issues || [],
        userInput.organizations || [],
        userInput.username,
        userInput.githubLink || '',
        userInput.personalLink || '',
        userInput.preferredLanguages || [],
        userInput.stackoverflowLink || '',
        false,
        userInput.pullRequests || [],
        userInput.upvotes || [],
        userInput.activePullRequests || 0,
        userInput.completedPullRequests || 0,
        userInput.dollarsEarned || 0,
        userInput.isOnline || true,
        userInput.rejectedPullRequests,
        userInput.balance || 0,
      ],
    ];
    try {
      const result = await createUser(issue);
      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async args => {
    const { id } = args;
    try {
      const data = {
        modified_date: new Date(), // update modified date
        first_name: 'Deleted',
        last_name: 'User',
        email: '',
        watching: [],
        rep: 0,
        profile_pic:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBvwAcytGFLkWO2eT-FCwE5z_mlQxBdI9uwbyeczCTVBci7Vrg&usqp=CAU',
        comments: [],
        attempting: [],
        issues: [],
        organizations: [],
        username: '[deleted]',
        github_link: '',
        personal_link: '',
        preferred_languages: [],
        stackoverflow_link: '',
        is_deleted: true,
        activePullRequests: 0,
        completedPullRequests: 0,
        dollarsEarned: 0,
        isOnline: false,
        rejectedPullRequests: 0,
        balance: 0,
      };
      const result = await deleteUser('users', id, data);
      return result;
    } catch (err) {
      throw err;
    }
  },
  getUsers: async () => {
    try {
      const result = await getUsers('users');
      return result;
    } catch (err) {
      throw err;
    }
  },
  getUserOrganizations: async args => {
    const { id } = args;
    try {
      const result = await getOrganizationsWhere('owner_id', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
  getWatchList: async args => {
    const { idArray, type } = args;
    try {
      const watchListResult = await Promise.all(
        idArray.map(async issueId => {
          const [result] = await getWatchList(issueId, type);
          return result;
        }),
      );
      const result = watchListResult;
      return result;
    } catch (err) {
      throw err;
    }
  },
  oneUser: async args => {
    const { column, query } = args;
    try {
      const [result] = await getOneUser('users', query, column);
      const { attempting, issues, organizations, watching } = result;
      const attemptingListResult = await Promise.all(
        attempting.map(async issueId => {
          const type = 'userAttemptList';
          const [attemptingResult] = await getWatchList(issueId, type);
          return attemptingResult;
        }),
      );
      result.attempting = attemptingListResult;
      const issuesListResult = await Promise.all(
        issues.map(async issueId => {
          const [issuesResult] = await getOneIssue(issueId);
          return issuesResult;
        }),
      );
      result.issues = issuesListResult;
      const organizationsListResult = await Promise.all(
        organizations.map(async organizationId => {
          const [organizationsResult] = await getOneOrganization(
            organizationId,
          );
          return organizationsResult;
        }),
      );
      result.organizations = organizationsListResult;
      const watchingListResult = await Promise.all(
        watching.map(async issueId => {
          const type = 'userWatchList';
          const [watchingResult] = await getWatchList(issueId, type);
          return watchingResult;
        }),
      );
      result.watching = watchingListResult;
      return result;
    } catch (err) {
      throw err;
    }
  },
  searchUsers: async args => {
    const { value } = args;
    try {
      const result = await searchUsers('users', value);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformUser: async args => {
    const { id, userInput } = args;
    try {
      const data = {
        modified_date: new Date(), // update modified date
        first_name: userInput.firstName,
        last_name: userInput.lastName,
        email: userInput.email,
        watching: userInput.watching,
        rep: userInput.rep,
        profile_pic: userInput.profilePic,
        comments: userInput.comments,
        attempting: userInput.attempting,
        issues: userInput.issues,
        organizations: userInput.organizations,
        username: userInput.username,
        github_link: userInput.githubLink,
        personal_link: userInput.personalLink,
        preferred_languages: userInput.preferredLanguages,
        stackoverflow_link: userInput.stackoverflowLink,
        pull_requests: userInput.pullRequests,
        balance: userInput.balance,
      };
      const queryResult = await transformUser('users', id, data);
      const result = {
        id: queryResult.id,
        createdDate: queryResult.created_date,
        modifiedDate: queryResult.modified_date,
        firstName: queryResult.first_name,
        lastName: queryResult.last_name,
        email: queryResult.email,
        watching: queryResult.watching,
        rep: queryResult.rep,
        profilePic: queryResult.profile_pic,
        comments: queryResult.comments,
        attempting: queryResult.attempting,
        issues: queryResult.issues,
        organizations: queryResult.organizations,
        username: queryResult.username,
        githubLink: userInput.github_link,
        personalLink: userInput.personal_link,
        preferredLanguages: userInput.preferred_languages,
        stackoverflowLink: userInput.stackoverflow_link,
        pullRequests: userInput.pull_requests,
        balance: userInput.balance,
      };
      return result;
    } catch (err) {
      throw err;
    }
  },
  updateUserArray: async args => {
    const { id, column, data, remove } = args;
    const [result] = await updateUserArray('users', column, id, data, remove);
    return result;
  },
  userUpvote: async args => {
    const { id } = args;
    const [result] = await userUpvote('users', id);
    return result;
  },
};
