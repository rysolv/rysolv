const messageValues = [
  'body',
  'created_date',
  'id',
  'position_id',
  'read',
  'user_id',
];

const messageReturnValues = `
  messages.body,
  messages.created_date AS "createdDate",
  messages.id AS "commentId",
  messages.position_id AS "positionId",
  messages.read,
  messages.user_id AS "userId"
`;

module.exports = { messageReturnValues, messageValues };
