const { v4: uuidv4 } = require('uuid');

const PullRequestSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    'fixes that one issue', // title
    'more detail about the fix', // body
    'https://github.com/annapo23/code_fix/', // repo
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'RYSOLVED AN ISSUE',
    'more detail about the fix',
    'https://github.com/annapo23/code_fix/',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'that bug is done for',
    'more detail about the fix',
    'https://github.com/annapo23/code_fix/',
  ],
];

module.exports = PullRequestSeed;
