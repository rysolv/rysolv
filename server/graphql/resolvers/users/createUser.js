const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicateUserEmail,
  createCompany,
  createUser: createUserQuery,
  insertUserCompany,
} = require('../../../db');
const { createUserError } = require('./constants');
const { errorLogger } = require('../../../helpers');
const { registerCognitoUser } = require('../../../middlewares/awsConfig');
const { uploadImage } = require('../../../middlewares/imageUpload');

const createUser = async ({
  userInput: { email, firstName, isCompany, lastName, password, username },
}) => {
  try {
    await checkDuplicateUserEmail({ email });

    // Register user with AWS
    const { userId } = await registerCognitoUser({ email, password });

    const provider = 'cognito';
    const { uploadUrl } = await uploadImage(
      new Identicon(userId, 250).toString(),
    );

    const newUser = {
      created_date: new Date(),
      email,
      first_name: firstName,
      id: userId,
      last_name: lastName,
      modified_date: new Date(),
      profile_pic: uploadUrl,
      provider,
      user_type: 'full',
      username,
    };
    let result = await createUserQuery({ data: newUser });

    if (isCompany) {
      const companyId = uuidv4();
      const id = uuidv4();
      const data = { id: companyId };
      const userCompanyValues = [companyId, id, userId];
      await createCompany({ data });
      await insertUserCompany({ values: userCompanyValues });
      result = { ...result, company: { companyId } };
    }

    return {
      __typename: 'User',
      ...result,
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

module.exports = createUser;
