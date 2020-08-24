const commentValues = [
  'body',
  'created_date',
  'id',
  'modified_date',
  'target',
  'user_id',
];

const commentReturnValues = `
  comments.body,
  comments.created_date AS "createdDate",
  comments.id AS "commentId",
  comments.modified_date AS "modifiedDate",
  comments.target,
  users.id AS "userId",
  users.profile_pic AS "profilePic",
  users.username
`;

module.exports = { commentReturnValues, commentValues };
