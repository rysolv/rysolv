const { errorLogger } = require('../../../helpers');
const { getUsers: getUsersQuery, getUserTechStack } = require('../../../db');
const { getUsersError } = require('./constants');

const getUsers = async () => {
  try {
    const users = await getUsersQuery();

    await Promise.all(
      users.map(async ({ id }, index) => {
        const { skills } = await getUserTechStack({ userId: id });
        users[index].preferredLanguages = skills.map(({ name }) => name);
      }),
    );

    return {
      __typename: 'UserArray',
      users,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getUsersError,
    };
  }
};

module.exports = getUsers;
