const { errorLogger } = require('../../../helpers');
const { signOutError, signOutSuccess } = require('./constants');

const signOut = async (_, { res }) => {
  try {
    res.clearCookie('userToken');
    res.clearCookie('signedIn');

    return {
      __typename: 'Success',
      message: signOutSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: signOutError,
    };
  }
};

module.exports = signOut;
