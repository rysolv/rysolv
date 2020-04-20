const { v4: uuidv4 } = require('uuid');

// comments(id, createdDate, modifiedDate, target, body, user)
const commentSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    '20619026-0f61-4772-9bb8-36ed643d4dcd', // target id
    'Comment comment comment', // body
    'c2209ded-9219-4ee3-9c29-f863889053c0', // user id
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    '20619026-0f61-4772-9bb8-36ed643d4dcd',
    'Comment comment comment comment',
    'c2209ded-9219-4ee3-9c29-f863889053c0',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    '20619026-0f61-4772-9bb8-36ed643d4dcd',
    'Comment comment comment comment comment',
    'c2209ded-9219-4ee3-9c29-f863889053c0',
  ],
];

module.exports = commentSeed;
