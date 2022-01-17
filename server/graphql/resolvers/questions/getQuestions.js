const { CustomError, errorLogger } = require('../../../helpers');
const {
  getQuestions: getQuestionsQuery,
  getTechnologies,
} = require('../../../db');
const { getQuestionsError } = require('./constants');

const getQuestions = async ({ category }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getQuestionsQuery({ category });

    if (category === 'company_position' || category === 'hiring') {
      const technologies = await getTechnologies();
      const technologyResponses = technologies.map(({ id, value }) => ({
        id,
        responseKey: 'skill',
        value,
      }));
      result.forEach((question, i) => {
        if (question.questionKey === 'skills') {
          result[i].responses = technologyResponses;
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
