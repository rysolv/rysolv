const { v4: uuidv4 } = require('uuid');

// comments(id, createdDate, modifiedDate, target, body, user)
const commentSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    'issueID', // target id
    'Comment comment comment', // body
    'UserID', // user id
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'issueID',
    'Comment comment comment comment',
    'UserID',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'issueID',
    'Comment comment comment comment comment',
    'UserID',
  ],
];

module.exports = commentSeed;
