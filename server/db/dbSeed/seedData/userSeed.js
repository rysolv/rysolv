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
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'], // active_number
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'], // issues_number
    'norris23', // username
    'https://github.com/tylermaran', // github_link
    'https://www.tylermaran.com/', // personal_link
    'Javascript', // preferred_languages
    'https://stackoverflow.com/users/22656/tyler-maran', // stackoverflow_link
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
    ['d7985d02-382f-424b-9507-78efcb993d88'], // active_number
    ['d7985d02-382f-424b-9507-78efcb993d88'], // issues_number
    'annapo', // username
    'https://github.com/annapo23', // github_link
    'https://www.annapojawis.com/', // personal_link
    'Javascript', // preferred_languages
    'https://stackoverflow.com/users/22656/anna-pojawis', // stackoverflow_link
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
    ['04790329-9fa7-438c-8627-4d400822f673'], // active_number
    ['04790329-9fa7-438c-8627-4d400822f673'], // issues_number
    'paulhouse45', // username
    'https://github.com/paulhouse', // github_link
    'https://www.paulhouz.com/', // personal_link
    'C++', // preferred_languages
    'https://stackoverflow.com/users/22656/paul-house', // stackoverflow_link
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
    ['04790329-9fa7-438c-8627-4d400822f673'], // active_number
    [
      '04790329-9fa7-438c-8627-4d400822f673',
      '04790329-9fa7-438c-8627-4d400822f673',
    ], // issues_number
    'jquerie', // username
    'https://github.com/jquerie', // github_link
    'https://www.jquerie.com/', // personal_link
    'Rust', // preferred_languages
    'https://stackoverflow.com/users/22656/jay-querie', // stackoverflow_link
  ],
];

module.exports = userSeed;
