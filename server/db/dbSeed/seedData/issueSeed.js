const { v4: uuidv4 } = require('uuid');

// issues(id, createdDate, modifiedDate, name, body, repo)
const issueSeed = [
  [
    uuidv4(),
    new Date(),
    new Date(),
    'bug trying to do the thing',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'bug trying to do some other thing',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'still stuck on the same bug',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
  ],
];

module.exports = issueSeed;
