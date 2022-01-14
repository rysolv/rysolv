/* eslint-disable no-param-reassign */

const Jimp = require('jimp');
const {
  createUserTechStack,
  deleteUserTechStack,
  transformUser: transformUserQuery,
} = require('../../../db');
const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
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
        // Upload standard image
        const { uploadUrl } = await uploadImage(formattedProfilePic);

        // Upload blurred image
        const image = await Jimp.read(uploadUrl);
        image.blur(15);
        const base64 = await image.getBase64Async(Jimp.AUTO);
        const { uploadUrl: blurUrl } = await uploadImage(base64);

        userInput.profilePic = uploadUrl;
        userInput.profilePicBlur = blurUrl;
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
      profile_pic_blur: userInput.profilePicBlur,
      profile_pic: userInput.profilePic,
      receive_weekly_emails: userInput.receiveWeeklyEmails,
      stackoverflow_link: userInput.stackoverflowLink,
      username: userInput.username,
    };

    if (userInput.preferredLanguages) {
      await deleteUserTechStack({ userId });
      userInput.preferredLanguages.map(async value => {
        const { beginner, expert, intermediate, skill } = value;
        await createUserTechStack({
          level: generatePositionLevel({ beginner, expert, intermediate }),
          technology: skill,
          userId,
        });
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
