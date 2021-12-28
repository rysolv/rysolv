const { singleQuery } = require('../../baseQueries');

const answerQuestionByKey = async ({
  category,
  questionKey,
  responseKey,
  userId,
  value,
}) => {
  const queryText = `
    WITH question AS (
      SELECT ID FROM questions WHERE category = $1 AND question_key = $2
    )
    UPDATE user_question_responses
    SET (created_date, response_id, value)
    = (
      $3,
      (
        SELECT qr.id FROM question_responses qr
        WHERE qr.question_id = (SELECT id FROM question)
        AND response_key = $4
      ),
      $6
    )
    WHERE question_id = (SELECT id FROM question)
    AND user_id = $5
  `;
  const values = [
    category,
    questionKey,
    new Date(),
    responseKey,
    userId,
    value || null,
  ];
  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = answerQuestionByKey;
