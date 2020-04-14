const { v4: uuidv4 } = require('uuid');

// comments(id, createdDate, modifiedDate, target, body, user)
const commentSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    'issueID', // target id
    'Comment comment comment', // body
    'c2209ded-9219-4ee3-9c29-f863889053c0', // user id
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'issueID',
    'Comment comment comment comment',
    'c2209ded-9219-4ee3-9c29-f863889053c0',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'issueID',
    'Comment comment comment comment comment',
    'c2209ded-9219-4ee3-9c29-f863889053c0',
  ],
];

module.exports = commentSeed;
