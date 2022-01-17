const { singleQuery } = require('../../baseQueries');

const createMessage = async ({ data }) => {
  const {
    body,
    createdDate,
    fromUserId,
    positionId,
    threadId,
    toUserId,
  } = data;

  const queryText = `
    WITH new_message AS (
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
      RETURNING
        id,
        body,
        created_date,
        from_user_id,
        position_id,
        thread_id,
        to_user_id,
        read_date
      )
      SELECT
        nm.body,
        nm.created_date AS "createdDate",
        nm.id,
        nm.read_date AS "readDate",
        u.first_name AS "firstName",
        u.id AS "userId",
        u.last_name AS "lastName",
        u.profile_pic AS "profilePic",
        u.username
      FROM new_message nm
      JOIN users u ON u.id = nm.from_user_id
  `;
  const values = [
    body,
    createdDate,
    fromUserId,
    positionId,
    threadId,
    toUserId,
  ];
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createMessage;
