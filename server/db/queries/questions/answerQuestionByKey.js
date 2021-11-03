const { v4: uuidv4 } = require('uuid');
const { singleQuery } = require('../../baseQueries');

const answerQuestionByKey = async ({
  questionKey,
  responseKey,
  userId,
  value,
}) => {
  const queryText = `
    WITH question AS (
      SELECT ID FROM questions WHERE question_key = $1
    )
    INSERT INTO user_question_responses
    (id, created_date, question_id, response_id, user_id, value)
    VALUES (
      $2,
      $3,
      (SELECT ID FROM question),
      (
        SELECT qr.id FROM question_responses qr
        WHERE qr.question_id = (SELECT id FROM question)
        AND response_key = $4
      ),
      $5,
      $6
    )
  `;
  const values = [
    questionKey,
    uuidv4(),
    new Date(),
    responseKey,
    userId,
    value || null,
  ];
  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = answerQuestionByKey;
