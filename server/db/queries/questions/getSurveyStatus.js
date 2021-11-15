const { singleQuery } = require('../../baseQueries');

const getSurveyStatus = async ({ userId }) => {
  // If the user has answered more than 1 hiring question (i.e. more than just timeline)
  // return survey status = true
  const queryText = `
    SELECT distinct(uqr.question_id)
	  FROM user_question_responses uqr
    JOIN questions q on uqr.question_id = q.id
	  WHERE uqr.user_id = $1
    AND q.category = 'hiring'
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });

  return rows.length > 1;
};

module.exports = getSurveyStatus;
