// const { v4: uuidv4 } = require('uuid');

const userSeed = [
  [
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d', // id
    new Date(), // created_date
    new Date(), // modified_date
    'Tyler', // first_name
    'Maran', // last_name
    'tyler.maran@gmail.com', // email
    ['f665d73f-6ae4-4699-bb53-c55d62489a29'], // watching_list
    2, // rep
    'https://rysolv.s3.us-east-2.amazonaws.com/tylerprofile.png', // profile_pic
    5, // active_number
    10, // issues_number
    'norris23', // username
  ],
  [
    'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
    new Date(),
    new Date(),
    'Anna',
    'Pojawis',
    'anna.pojawis@gmail.com',
    ['f665d73f-6ae4-4699-bb53-c55d62489a29'],
    25,
    'https://rysolv.s3.us-east-2.amazonaws.com/annaprofile.png',
    1, // active_number
    20, // issues_number
    'annapo', // username
  ],
  [
    'c2209ded-9219-4ee3-9c29-f863889053c0',
    new Date(),
    new Date(),
    'Paul',
    'House',
    'paul@myfooddata.com',
    ['f665d73f-6ae4-4699-bb53-c55d62489a29'],
    25,
    'https://rysolv.s3.us-east-2.amazonaws.com/paulprofile.png',
    1, // active_number
    4, // issues_number
    'paulhouse45', // username
  ],
  [
    'cdd583cf-4711-4f33-a202-c937081afd7e',
    new Date(),
    new Date(),
    'Jay',
    'Querie',
    'jay@querie.cc',
    ['f665d73f-6ae4-4699-bb53-c55d62489a29'],
    25,
    'https://rysolv.s3.us-east-2.amazonaws.com/jay.png',
    1, // active_number
    1, // issues_number
    'jquerie', // username
  ],
];

module.exports = userSeed;
