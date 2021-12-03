const { v4: uuidv4 } = require('uuid');

const {
  CustomError,
  errorLogger,
  generatePositionLevel,
  sendEmail,
} = require('../../../helpers');
const {
  createPositionTechStack,
  postUserResponse: postUserResponseQuery,
} = require('../../../db');
const {
  postUserResponseError,
  postUserResponseSuccess,
} = require('./constants');
const { uploadFile } = require('../../../middlewares/fileUpload');

const postUserResponse = async ({ responseArray }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await Promise.all(
      responseArray.map(
        async ({ questionId, questionKey, responseId, value }) => {
          // Language / Frameworks stored in techstack table
          if (questionKey === 'skills') {
            const { beginner, expert, intermediate, skill } = value;
            await createPositionTechStack({
              level: generatePositionLevel({ beginner, expert, intermediate }),
              technology: skill,
            });
          } else if (questionKey === 'preferred_languages') {
            // Removing preferred lang
          } else {
            let formattedValue = value || null;
            // Upload resume
            if (questionKey === 'resume') {
              const { uploadUrl } = await uploadFile(value);
              formattedValue = uploadUrl;
            }

            const data = {
              createdDate: new Date(),
              id: uuidv4(),
              questionId,
              responseId,
              userId,
              value: formattedValue,
            };
            await postUserResponseQuery(data);
          }
        },
      ),
    );

    // Send welcome to hiring email
    sendEmail({
      body: { userId },
      path: '/s/hiring/signup',
    });

    return {
      __typename: 'Success',
      message: postUserResponseSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || postUserResponseError,
    };
  }
};

module.exports = postUserResponse;
