const { v4: uuidv4 } = require('uuid');

const { CustomError, errorLogger, sendEmail } = require('../../../helpers');
const {
  createLanguage,
  getUserLanguages,
  postUserResponse: postUserResponseQuery,
  setPreferredLanguage,
} = require('../../../db');
const {
  postUserResponseError,
  postUserResponseSuccess,
} = require('./constants');
const { uploadFile } = require('../../../middlewares/fileUpload');

const postUserResponse = async ({ responseArray }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const { languages } = await getUserLanguages({ userId });
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
          } else {
            let formattedValue = null;
            if (questionKey === 'personal_link') formattedValue = value;
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
