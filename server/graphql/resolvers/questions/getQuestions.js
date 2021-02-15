const { errorLogger } = require('../../../helpers');
const { getQuestions: getQuestionsQuery } = require('../../../db');
const { getQuestionsError } = require('./constants');

const getQuestions = async ({ category }) => {
  try {
    const result = await getQuestionsQuery({ category });
    return {
      __typename: 'QuestionArray',
      questionArray: result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getQuestionsError,
    };
  }
};

module.exports = getQuestions;
