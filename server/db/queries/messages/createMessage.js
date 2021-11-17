const { singleQuery } = require('../../baseQueries');

const createMessage = async ({
  body,
  createdDate,
  fromUserId,
  positionId,
  threadId,
  toUserId,
}) => {
  const queryText = `
    INSERT INTO
    messages(
      body,
      created_date,
      from_user_id,
      position_id,
      thread_id,
      to_user_id
    )
    VALUES($1, $2, $3, $4, $5, $6)
  `;
  const values = [
    body,
    createdDate,
    fromUserId,
    positionId,
    threadId,
    toUserId,
  ];
  await singleQuery({ queryText, values });
};

module.exports = createMessage;
