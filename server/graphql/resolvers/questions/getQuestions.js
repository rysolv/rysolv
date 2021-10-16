const { v4: uuidv4 } = require('uuid');

const { CustomError, errorLogger } = require('../../../helpers');
const {
  getQuestions: getQuestionsQuery,
  getSkills,
  getUserLanguages,
} = require('../../../db');
const { defaultLanguages, getQuestionsError } = require('./constants');

const getQuestions = async ({ category }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getQuestionsQuery({ category });

    if (category === 'hiring') {
      const { languages } = await getUserLanguages({ userId });
      const languagesToUse = languages || defaultLanguages;
      const languageResponses = languagesToUse.map(el => ({
        id: uuidv4(),
        responseKey: 'language',
        value: el,
      }));
      result.forEach((question, i) => {
        if (question.questionKey === 'preferred_languages') {
          result[i].responses = languageResponses;
        }
      });
    }

    if (category === 'company_position') {
      const { skills } = await getSkills();
      const skillResponses = skills.map(el => ({
        id: uuidv4(),
        responseKey: 'skill',
        value: el,
      }));
      result.forEach((question, i) => {
        if (question.questionKey === 'skills') {
          result[i].responses = skillResponses;
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
