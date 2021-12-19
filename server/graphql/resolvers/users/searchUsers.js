const { errorLogger } = require('../../../helpers');
const {
  getUserTechStack,
  searchUsers: searchUsersQuery,
} = require('../../../db');

const searchUsers = async ({ value }) => {
  try {
    const users = await searchUsersQuery({ value });

    await Promise.all(
      users.map(async ({ id }, index) => {
        const { skills } = await getUserTechStack({ userId: id });
        users[index].preferredLanguages = skills.map(
          ({ shortName }) => shortName,
        );
      }),
    );

    return users;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = searchUsers;
