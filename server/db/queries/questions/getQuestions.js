const { singleQuery } = require('../../baseQueries');

const getQuestions = async ({ category }) => {
  const queryText = `
    SELECT
      q.id,
      q.priority,
      q.question_key AS "questionKey",
      q.question_text AS "questionText",
      q.response_limit AS "limit",
      q.subtext,
      COALESCE(json_agg((
        SELECT subquery FROM (
          SELECT
            qr.id,
            qr.response_key AS "responseKey",
            qr.value,
            qr.priority
            ORDER BY qr.priority ASC
          ) AS subquery
        ) ORDER BY qr.priority ASC
      ),'{}') AS responses
    FROM questions q
    LEFT JOIN question_responses qr ON qr.question_id = q.id
    WHERE q.category = $1
    GROUP BY
      q.id,
      q.priority,
      q.question_key,
      q.question_text,
      q.response_limit,
      q.subtext
    ORDER BY q.priority ASC
  `;
  const { rows } = await singleQuery({ queryText, values: [category] });
  return rows;
};

module.exports = getQuestions;
