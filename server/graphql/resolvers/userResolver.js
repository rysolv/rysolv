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
    console.log('userInput', userInput);
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
        userInput.preferredLanguages,
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
      const data = [
        [
          new Date(), // update modified date
          userInput.first_name,
          userInput.last_name,
          userInput.email,
          userInput.watching_list || [],
          userInput.rep || 0,
          userInput.profile_pic,
          userInput.active_number,
          userInput.issues_number,
          userInput.username,
        ],
      ];
      const result = await transformUser('users', id, data);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
