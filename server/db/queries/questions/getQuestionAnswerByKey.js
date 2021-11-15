const { singleQuery } = require('../../baseQueries');

const getQuestionAnswerByKey = async ({ userId, questionKey }) => {
  const queryText = `
    SELECT r.response_key as "responseKey"
    FROM user_question_responses uqr
    JOIN questions q ON uqr.question_id = q.id
    JOIN question_responses r on uqr.response_id = r.id
    WHERE uqr.user_id = $1
    AND q.question_key = $2
    ORDER BY uqr.created_date desc
    LIMIT 1
  `;

  const { rows } = await singleQuery({
    queryText,
    values: [userId, questionKey],
  });
  if (rows && rows.length) {
    const [oneRow] = rows;
    const { responseKey } = oneRow;
    return responseKey;
  }
  return null;
};

module.exports = getQuestionAnswerByKey;
