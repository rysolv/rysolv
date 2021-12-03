const { singleQuery } = require('../../baseQueries');

const setReadMessage = async ({ createdDate, threadId, userId }) => {
  const queryText = `
    UPDATE messages
    SET read_date = $1
    WHERE thread_id = $2
    AND read_date IS NULL
    AND from_user_id != $3
  `;

  await singleQuery({ queryText, values: [createdDate, threadId, userId] });
};

module.exports = setReadMessage;
