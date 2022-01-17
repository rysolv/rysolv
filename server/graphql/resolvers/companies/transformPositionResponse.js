const { v4: uuidv4 } = require('uuid');

const {
  createLocation,
  createPositionTechStack,
  deletePositionResponse,
  deletePositionTechStack,
  postUserResponse,
} = require('../../../db');
const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
const {
  transformPositionResponseError,
  transformPositionResponseSuccess,
} = require('./constants');

const transformPositionResponse = async (
  { positionId, responseArray },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await deletePositionResponse({ positionId });
    await deletePositionTechStack({ positionId });

    await Promise.all(
      responseArray.map(
        async ({ questionId, questionKey, responseId, value }) => {
          if (questionKey === 'location') {
            const { countryCode, country, formattedAddress, utcOffset } = value;
            await createLocation({
              country,
              countryCode,
              formattedAddress,
              positionId,
              utcOffset,
            });
          } else if (questionKey === 'skills') {
            const { beginner, expert, intermediate, skill } = value;
            await createPositionTechStack({
              level: generatePositionLevel({ beginner, expert, intermediate }),
              positionId,
              technology: skill,
            });
          } else {
            const data = {
              createdDate: new Date(),
              id: uuidv4(),
              positionId,
              questionId,
              responseId,
              userId,
              value,
            };
            await postUserResponse(data);
          }
        },
      ),
    );

    return {
      __typename: 'Success',
      message: transformPositionResponseSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformPositionResponseError,
    };
  }
};

module.exports = transformPositionResponse;
