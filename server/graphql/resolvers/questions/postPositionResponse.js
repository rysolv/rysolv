const { v4: uuidv4 } = require('uuid');

const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
const {
  createCompanyPosition,
  createPositionTechStack,
  postUserResponse: postUserResponseQuery,
} = require('../../../db');
const {
  postUserResponseError,
  postUserResponseSuccess,
} = require('./constants');

const postPositionResponse = async (
  { companyId, responseArray },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const positionId = uuidv4();

    // Create position
    await createCompanyPosition({ company_id: companyId, id: positionId });

    // Update user_question_responses with position data
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
              value: value || null,
            };
            await postUserResponseQuery(data);
          }
        },
      ),
    );

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

module.exports = postPositionResponse;
