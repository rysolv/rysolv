const { v4: uuidv4 } = require('uuid');

const OrganizationSeed = [
  [
    uuidv4(), // id
    new Date(), // create date
    new Date(), // last modified date
    'Flutter', // name
    'makes flutter stuff', // body
    'https://github.com/annapo23/code_fix/', // repo
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'OBS',
    'Does video streaming stuff',
    'https://github.com/annapo23/code_fix/',
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'ThreeJS',
    'three dimentional modeling with JS',
    'https://github.com/annapo23/code_fix/',
  ],
];

module.exports = OrganizationSeed;
