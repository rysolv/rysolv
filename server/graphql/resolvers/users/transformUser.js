/* eslint-disable no-param-reassign */
const {
  createLanguage,
  deleteUserLanguages,
  transformUser: transformUserQuery,
} = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const { transformUserError, transformUserSuccess } = require('./constants');
const { updateCognitoEmail } = require('../../../middlewares/awsConfig');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformUser = async (
  { userInput },
  { authError, email, provider, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    if (userInput.profilePic) {
      const formattedProfilePic = userInput.profilePic;
      const protocol = formattedProfilePic.substring(0, 5);

      if (formattedProfilePic && protocol !== 'https') {
        const { uploadUrl } = await uploadImage(formattedProfilePic);
        userInput.profilePic = uploadUrl;
      }
    }

    if (userInput.email && provider === 'cognito') {
      await updateCognitoEmail({
        currentEmail: email,
        newEmail: userInput.email,
      });
    }

    const data = {
      balance: userInput.balance,
      email_verified: userInput.emailVerified,
      email: userInput.email,
      first_name: userInput.firstName,
      github_link: userInput.githubLink,
      issues: userInput.issues,
      last_name: userInput.lastName,
      modified_date: new Date(),
      personal_link: userInput.personalLink,
      profile_pic: userInput.profilePic,
      stackoverflow_link: userInput.stackoverflowLink,
      username: userInput.username,
    };

    if (userInput.preferredLanguages) {
      await deleteUserLanguages({ userId });
      await createLanguage({
        languages: userInput.preferredLanguages,
        target: {
          userId,
        },
      });
    } else {
      await transformUserQuery({ data, userId });
    }

    return {
      __typename: 'Success',
      message: transformUserSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformUserError,
    };
  }
};

module.exports = transformUser;
