const { v4: uuidv4 } = require('uuid');

const OrganizationSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    'Flutter', // name
    'makes flutter stuff', // description
    'https://github.com/annapo23/code_fix/', // repo_url
    'https://www.rysolv.com', // website
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'], // issues
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1200px-OBS.svg.png', // logo
    false, // verified
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'OBS',
    'Does video streaming stuff',
    'https://github.com/annapo23/code_fix/',
    'https://www.rysolv.com',
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1200px-OBS.svg.png',
    true,
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'ThreeJS',
    'three dimentional modeling with JS',
    'https://github.com/annapo23/code_fix/',
    'https://www.rysolv.com',
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1200px-OBS.svg.png',
    true,
  ],
];

module.exports = OrganizationSeed;
