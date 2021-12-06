const { v4: uuidv4 } = require('uuid');

const {
  createPositionTechStack,
  deletePosition,
  deletePositionTechStack,
  postUserResponse,
} = require('../../../db');
const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
const {
  transformPositionError,
  transformPositionSuccess,
} = require('./constants');

const transformPosition = async (
  { positionId, responseArray },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await deletePosition({ positionId });
    await deletePositionTechStack({ positionId });

    await Promise.all(
      responseArray.map(
        async ({ questionId, questionKey, responseId, value }) => {
          if (questionKey === 'skills') {
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
      message: transformPositionSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformPositionError,
    };
  }
};

module.exports = transformPosition;
