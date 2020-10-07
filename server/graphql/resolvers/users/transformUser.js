/* eslint-disable no-param-reassign */
const { transformUser: transformUserQuery } = require('../../../db');
const { transformUserError, transformUserSuccess } = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformUser = async ({ userId, userInput }) => {
  try {
    if (userInput.profilePic) {
      const formattedProfilePic = userInput.profilePic;
      const protocol = formattedProfilePic.substring(0, 5);

      if (formattedProfilePic && protocol !== 'https') {
        const { uploadUrl } = await uploadImage(formattedProfilePic);
        userInput.profilePic = uploadUrl;
      }
    }
    const data = {
      attempting: userInput.attempting,
      balance: userInput.balance,
      comments: userInput.comments,
      email_verified: userInput.emailVerified,
      email: userInput.email,
      first_name: userInput.firstName,
      github_link: userInput.githubLink,
      issues: userInput.issues,
      last_name: userInput.lastName,
      modified_date: new Date(), // update modified date
      organizations: userInput.organizations,
      personal_link: userInput.personalLink,
      preferred_languages: userInput.preferredLanguages,
      profile_pic: userInput.profilePic,
      pull_requests: userInput.pullRequests,
      rep: userInput.rep,
      stackoverflow_link: userInput.stackoverflowLink,
      username: userInput.username,
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

module.exports = transformUser;
