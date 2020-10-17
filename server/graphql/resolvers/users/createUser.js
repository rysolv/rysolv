const Identicon = require('identicon.js');

const { createUser: createUserQuery } = require('../../../db');
const { createUserError } = require('./constants');
const { errorLogger } = require('../../../helpers');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createUser = async ({
  userInput: { email, firstName, id, lastName, username },
}) => {
  try {
    const { uploadUrl } = await uploadImage(new Identicon(id, 250).toString());
    const newUser = {
      created_date: new Date(),
      email,
      first_name: firstName,
      id,
      last_name: lastName,
      modified_date: new Date(),
      profile_pic: uploadUrl,
      username,
    };
    const result = await createUserQuery({ data: newUser });
    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    const { message } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || createUserError,
    };
  }
};

module.exports = createUser;
