const { v4: uuidv4 } = require('uuid');
const {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  searchUsers,
  transformUser,
} = require('../../db');

module.exports = {
  createUser: async args => {
    const { userInput } = args;
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        userInput.firstName,
        userInput.lastName,
        userInput.email,
        userInput.watchingList || [],
        userInput.rep || 0,
        userInput.profilePic,
        userInput.activeNumber || 0,
        userInput.issuesNumber || 0,
        userInput.username,
        userInput.githubLink || '',
        userInput.personalLink || '',
        userInput.preferredLanguages || '',
        userInput.stackoverflowLink || '',
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
      const result = await deleteUser('users', id);
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
  oneUser: async args => {
    const { id } = args;
    try {
      const [result] = await getOneUser('users', id);
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
        watching_list: userInput.watchingList,
        rep: userInput.rep,
        profile_pic: userInput.profilePic,
        active_number: userInput.activeNumber,
        issues_number: userInput.issuesNumber,
        username: userInput.username,
        github_link: userInput.githubLink,
        personal_link: userInput.personalLink,
        preferred_languages: userInput.preferredLanguages,
        stackoverflow_link: userInput.stackoverflowLink,
      };
      const queryResult = await transformUser('users', id, data);
      const result = {
        modifiedDate: queryResult.modified_date,
        firstName: queryResult.first_name,
        lastName: queryResult.last_name,
        email: queryResult.email,
        watchingList: queryResult.watching_list,
        rep: queryResult.rep,
        profilePic: queryResult.profile_pic,
        activeNumber: queryResult.active_number,
        issuesNumber: queryResult.issues_number,
        username: queryResult.username,
        githubLink: userInput.github_link,
        personalLink: userInput.personal_link,
        preferredLanguages: userInput.preferred_languages,
        stackoverflowLink: userInput.stackoverflow_link,
      };
      return result;
    } catch (err) {
      throw err;
    }
  },
};
