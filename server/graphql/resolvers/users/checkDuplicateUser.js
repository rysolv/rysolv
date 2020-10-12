const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
} = require('../../../db');
const { checkDuplicateUserSuccess, createUserError } = require('./constants');

const checkDuplicateUser = async ({ email, username }) => {
  try {
    await checkDuplicateUserEmail({ email });
    await checkDuplicateUsername({ username });

    return {
      __typename: 'Success',
      message: checkDuplicateUserSuccess,
    };
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || createUserError,
    };
  }
};

module.exports = checkDuplicateUser;
