const { createUserError } = require('./constants');
const { errorLogger } = require('../../../helpers');
const { getOneUserSignUp } = require('../../../db');

const oneUserSignUp = async ({ email }) => {
  try {
    const result = await getOneUserSignUp({ email });
    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: createUserError,
    };
  }
};

module.exports = oneUserSignUp;
