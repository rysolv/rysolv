const { transformUser: transformUserQuery } = require('../../../db');
const { transformUserError, transformUserSuccess } = require('./constants');

const verifyUserEmail = async ({ userId }) => {
  try {
    const data = {
      email_verified: true,
      modified_date: new Date(),
    };
    await transformUserQuery({ data, userId });
    return {
      __typename: 'Success',
      message: transformUserSuccess,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: transformUserError,
    };
  }
};

module.exports = verifyUserEmail;
