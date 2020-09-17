const Identicon = require('identicon.js');

const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  createUser: createUserQuery,
} = require('../../../db');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createUser = async args => {
  const {
    userInput: { email, firstName, id, lastName, username },
  } = args;

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

  try {
    await checkDuplicateUserEmail({ email });
    await checkDuplicateUsername({ username });

    const result = await createUserQuery({ data: newUser });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = createUser;
