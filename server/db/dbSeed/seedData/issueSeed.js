const { v4: uuidv4 } = require('uuid');

// issues(id, createdDate, modifiedDate, name, body, repo)
const issueSeed = [
  [
    uuidv4(), // id
    new Date(), // created date
    new Date(), // modified date
    'flutter', // organization
    'bug trying to do the thing', // name
    'more detail about the issue', // body
    'https://github.com/annapo23/code_fix/', // repo
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'OBS',
    'bug trying to do some other thing',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'SupertuxKart',
    'still stuck on the same bug',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
  ],
];

module.exports = issueSeed;
