const { v4: uuidv4 } = require('uuid');

const {
  CustomError,
  errorLogger,
  generatePositionLevel,
  sendEmail,
} = require('../../../helpers');
const {
  createCompanyPosition,
  createLanguage,
  createPositionTechStack,
  getOneTechnology,
  getUserLanguages,
  postUserResponse: postUserResponseQuery,
  setPreferredLanguage,
} = require('../../../db');
const {
  postUserResponseError,
  postUserResponseSuccess,
} = require('./constants');
const { uploadFile } = require('../../../middlewares/fileUpload');

const postUserResponse = async (
  { companyId, responseArray },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const { languages } = await getUserLanguages({ userId });
    const positionId = uuidv4();

    if (companyId && positionId) {
      const data = { company_id: companyId, id: positionId };
      await createCompanyPosition({ data });
    }

    await Promise.all(
      responseArray.map(
        async ({ questionId, questionKey, responseId, value }) => {
          if (questionKey === 'preferred_languages') {
            if (languages && languages.includes(value)) {
              await setPreferredLanguage({ language: value, userId });
            } else {
              await createLanguage({
                languages: [value],
                preferred: true,
                target: { userId },
              });
            }
          } else if (questionKey === 'skills') {
            const { beginner, expert, intermediate, skill } = value;
            const { technologyId } = getOneTechnology({ technology: skill });
            await createPositionTechStack({
              level: generatePositionLevel({ beginner, expert, intermediate }),
              positionId,
              technologyId,
            });
          } else {
            let formattedValue = null;
            if (
              questionKey === 'description' ||
              questionKey === 'location' ||
              questionKey === 'personal_link' ||
              questionKey === 'title'
            )
              formattedValue = value;
            if (questionKey === 'resume') {
              const { uploadUrl } = await uploadFile(value);
              formattedValue = uploadUrl;
            }

            const data = {
              createdDate: new Date(),
              id: uuidv4(),
              positionId,
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
