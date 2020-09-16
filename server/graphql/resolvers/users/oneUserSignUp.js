const { getOneUserSignUp } = require('../../../db');

const oneUserSignUp = async args => {
  const { email } = args;
  try {
    const result = await getOneUserSignUp({ email });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = oneUserSignUp;
