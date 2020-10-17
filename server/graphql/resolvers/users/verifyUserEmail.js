const { errorLogger } = require('../../../helpers');
const { transformUser: transformUserQuery } = require('../../../db');
const { verifyUserEmailError, verifyUserEmailSuccess } = require('./constants');

const verifyUserEmail = async ({ userId }) => {
  try {
    const data = {
      email_verified: true,
      modified_date: new Date(),
    };
    await transformUserQuery({ data, userId });
    return {
      __typename: 'Success',
      message: verifyUserEmailSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: verifyUserEmailError,
    };
  }
};

module.exports = verifyUserEmail;
