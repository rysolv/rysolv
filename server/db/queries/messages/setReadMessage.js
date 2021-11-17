const { singleQuery } = require('../../baseQueries');

const createMessage = async ({ createdDate, messageIds }) => {
  const queryText = `
    UPDATE messages
    SET read_date = $1
    WHERE id IN $2
  `;

  await singleQuery({ queryText, values: [createdDate, messageIds] });
};

module.exports = createMessage;
