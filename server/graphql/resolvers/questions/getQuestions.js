const { v4: uuidv4 } = require('uuid');

const { CustomError, errorLogger } = require('../../../helpers');
const {
  getQuestions: getQuestionsQuery,
  getUserLanguages,
} = require('../../../db');
const { getQuestionsError } = require('./constants');

const getQuestions = async ({ category }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getQuestionsQuery({ category });

    if (category === 'hiring') {
      const { languages } = await getUserLanguages({ userId });
      const languageRespones = languages.map(el => ({
        id: uuidv4(),
        responseKey: 'language',
        value: el,
      }));
      result.forEach((question, i) => {
        if (question.questionKey === 'preferred_languages') {
          result[i].responses = languageRespones;
        }
      });
    }

    return {
      __typename: 'QuestionArray',
      questionArray: result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getQuestionsError,
    };
  }
};

module.exports = getQuestions;
