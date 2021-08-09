const { singleQuery } = require('../../baseQueries');

const postUserResponse = async ({
  createdDate,
  id,
  questionId,
  responseId,
  userId,
  value,
}) => {
  const queryText = `
    INSERT INTO user_question_responses(
      created_date,
      id,
      question_id,
      response_id,
      user_id,
      value
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [createdDate, id, questionId, responseId, userId, value];
  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = postUserResponse;
