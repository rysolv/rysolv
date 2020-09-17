const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
} = require('../../../db');

const checkDuplicateUser = async args => {
  const { username, email } = args;
  try {
    await checkDuplicateUserEmail({ email });
    await checkDuplicateUsername({ username });

    return {
      __typename: 'Success',
      message: 'No duplicate user exists',
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = checkDuplicateUser;
