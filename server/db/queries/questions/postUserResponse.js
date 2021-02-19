const { singleQuery } = require('../../baseQueries');

const postUserResponse = async ({
  createdDate,
  id,
  questionId,
  responseId,
  userId,
}) => {
  const queryText = `
    INSERT INTO user_question_responses(
      created_date,
      id,
      question_id,
      response_id,
      user_id
    ) VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [createdDate, id, questionId, responseId, userId];
  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = postUserResponse;
