const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
} = require('../../../db');
const { checkDuplicateUserSuccess, createUserError } = require('./constants');
const { errorLogger } = require('../../../helpers');

const checkDuplicateUser = async ({ email, username }) => {
  try {
    await checkDuplicateUserEmail({ email });
    await checkDuplicateUsername({ username });

    return {
      __typename: 'Success',
      message: checkDuplicateUserSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createUserError,
    };
  }
};

module.exports = checkDuplicateUser;
