const { v4: uuidv4 } = require('uuid');

// issues(id, createdDate, modifiedDate, name, body, repo)
const issueSeed = [
  [
    '20619026-0f61-4772-9bb8-36ed643d4dcd', // id
    new Date(), // created date
    new Date(), // modified date
    'flutter', // organization
    'bug trying to do the thing', // name
    'more detail about the issue', // body
    'https://github.com/annapo23/code_fix/', // repo
    'Javascript', // language
    ['commentID'], // comments
    5, // attempts
    2, // active attempts
    ['517fa5c9-1d6e-4925-8bcc-25c24cd0b95d'], // Reference to User ID
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'OBS',
    'bug trying to do some other thing',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
    'Python',
    ['3489234'],
    3,
    1,
    ['cdd583cf-4711-4f33-a202-c937081afd7e'],
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'SupertuxKart',
    'still stuck on the same bug',
    'more detail about the issue',
    'https://github.com/annapo23/code_fix/',
    'C',
    ['6523421'],
    8,
    6,
    ['cdd583cf-4711-4f33-a202-c937081afd7e'],
  ],
];

module.exports = issueSeed;
