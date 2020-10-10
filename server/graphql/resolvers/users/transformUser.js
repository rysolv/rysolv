/* eslint-disable no-param-reassign */
const { transformUser: transformUserQuery } = require('../../../db');
const { transformUserError, transformUserSuccess } = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformUser = async ({ userInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

    if (userInput.profilePic) {
      const formattedProfilePic = userInput.profilePic;
      const protocol = formattedProfilePic.substring(0, 5);

      if (formattedProfilePic && protocol !== 'https') {
        const { uploadUrl } = await uploadImage(formattedProfilePic);
        userInput.profilePic = uploadUrl;
      }
    }
    const data = {
      balance: userInput.balance,
      email_verified: userInput.emailVerified,
      email: userInput.email,
      first_name: userInput.firstName,
      github_link: userInput.githubLink,
      issues: userInput.issues,
      last_name: userInput.lastName,
      modified_date: new Date(), // update modified date
      personal_link: userInput.personalLink,
      preferred_languages: userInput.preferredLanguages,
      profile_pic: userInput.profilePic,
      stackoverflow_link: userInput.stackoverflowLink,
      username: userInput.username,
    };
    await transformUserQuery({ data, userId });
    return {
      __typename: 'Success',
      message: transformUserSuccess,
    };
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || transformUserError,
    };
  }
};

module.exports = transformUser;
