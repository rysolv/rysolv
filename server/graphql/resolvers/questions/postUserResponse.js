const { v4: uuidv4 } = require('uuid');

const {
  CustomError,
  errorLogger,
  generatePositionLevel,
  sendEmail,
} = require('../../../helpers');
const {
  createLocation,
  createUserTechStack,
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
          if (questionKey === 'preferred_location') {
            const { countryCode, country, formattedAddress, utcOffset } = value;
            await createLocation({
              country,
              countryCode,
              formattedAddress,
              userId,
              utcOffset,
            });
          } else if (questionKey === 'skills') {
            const { beginner, expert, intermediate, skill } = value;
            await createUserTechStack({
              level: generatePositionLevel({ beginner, expert, intermediate }),
              technology: skill,
              userId,
            });
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
