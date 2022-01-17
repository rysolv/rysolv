const { v4: uuidv4 } = require('uuid');

const {
  createLocation,
  createUserTechStack,
  deleteUserResponse,
  deleteUserTechStack,
  postUserResponse,
} = require('../../../db');
const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
const {
  transformUserResponseError,
  transformUserResponseSuccess,
} = require('./constants');
const { uploadFile } = require('../../../middlewares/fileUpload');

const transformUserResponse = async (
  { responseArray },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await deleteUserResponse({ userId });
    await deleteUserTechStack({ userId });

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
            await postUserResponse(data);
          }
        },
      ),
    );

    return {
      __typename: 'Success',
      message: transformUserResponseSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformUserResponseError,
    };
  }
};

module.exports = transformUserResponse;
