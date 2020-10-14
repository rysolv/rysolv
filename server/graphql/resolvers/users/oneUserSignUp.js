const { createUserError } = require('./constants');
const { getOneUserSignUp } = require('../../../db');

const oneUserSignUp = async ({ email }) => {
  try {
    const result = await getOneUserSignUp({ email });
    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: createUserError,
    };
  }
};

module.exports = oneUserSignUp;
