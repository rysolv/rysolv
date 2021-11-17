const { singleQuery } = require('../../baseQueries');

const getMessages = async ({ userId }) => {
  const queryText = `
    SELECT * FROM MESSAGES
    WHERE from_user_id = $1
  `;

  await singleQuery({ queryText, values: [userId] });
};

module.exports = getMessages;
