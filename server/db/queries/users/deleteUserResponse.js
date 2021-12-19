const { singleQuery } = require('../../baseQueries');

const deleteUserResponse = async ({ userId }) => {
  const queryText = `
    DELETE FROM user_question_responses uqr
    USING questions q
    WHERE q.category = 'hiring'
    AND q.id = uqr.question_id
    AND uqr.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = deleteUserResponse;
