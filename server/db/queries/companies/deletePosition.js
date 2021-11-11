const { singleQuery } = require('../../baseQueries');

const deletePosition = async ({ positionId }) => {
  const queryText = `
    DELETE FROM user_question_responses uqr
    WHERE uqr.position_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = deletePosition;
