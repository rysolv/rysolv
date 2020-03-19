const { v4: uuidv4 } = require('uuid');

// users(id, createdDate, modifiedDate, firstName, lastName, email, lastOnline, watchingNumber, watchingList)

const userSeed = [
  [
    uuidv4(),
    new Date(),
    new Date(),
    'tyler',
    'maran',
    'tyler.maran@gmail.com',
    new Date(),
    2,
    ['issue 1', 'issue 2'],
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'Anna',
    'pojawis',
    'anna.pojawis@gmail.com',
    new Date(),
    2,
    ['issue 1', 'issue 2'],
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'paul',
    'house',
    'paul@myfooddata.com',
    new Date(),
    3,
    ['1', '2', '3'],
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'Jay',
    'querie',
    'jay@querie.cc',
    new Date(),
    5,
    ['1', '2', '3', '4', '5'],
  ],
];

module.exports = userSeed;
