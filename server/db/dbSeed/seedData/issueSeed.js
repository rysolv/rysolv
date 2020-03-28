const { v4: uuidv4 } = require('uuid');

// issues(id, createdDate, modifiedDate, name, body, repo)
const issueSeed = [
  [
    '20619026-0f61-4772-9bb8-36ed643d4dcd', // id
    new Date(), // created date
    new Date(), // modified date
    'Flutter', // organization
    'ddb0ed71-01e8-4a14-a3fd-8d6ee40f131a', // organization id
    'Date Picker text field shows errors when switching back from Calendar mode ', // name
    'It shouldnt show the error again until an invalid date was typed', // body
    'https://github.com/flutter/flutter', // repo
    'Javascript', // language
    ['commentID'], // comments
    5, // attempts
    2, // active attempts
    ['517fa5c9-1d6e-4925-8bcc-25c24cd0b95d'], // Contributor: Reference to User ID
    42, // rep
    ['517fa5c9-1d6e-4925-8bcc-25c24cd0b95d'], // Watchlist: Reference to user ID
    20, // value
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'OBS',
    '1a64925c-858f-42b4-a09c-39d5699375f4',
    '[Bug]: Scene Collections with "/" in their name cannot be imported',
    'Instead of adding the scene collection to the list, OBS just doesnt do anything. It closes the dialog, doesnt give an error message. The scene collection is not added.',
    'https://github.com/obsproject/obs-studio',
    'C / C++',
    ['3489234'],
    3,
    1,
    ['cdd583cf-4711-4f33-a202-c937081afd7e'],
    25,
    ['517fa5c9-1d6e-4925-8bcc-25c24cd0b95d'],
    0,
  ],
  [
    uuidv4(),
    new Date(),
    new Date(),
    'SupertuxKart',
    '79a3ef7b-bf7d-4e4c-abb8-08cd521d5506',
    '[Physics problems] the kart is sticked (sliding) to wall when exiting your car parking backwards',
    'If you got stick to the wall (at left side -kart is parallel to the wall- for example), and you try to leave backwards (usefull in soccer mode) while braking (right: you still completely stuck; left: you still stuck at 45deg), the kart continue straight backward.',
    'https://github.com/supertuxkart/stk-code',
    'C / C++',
    ['6523421'],
    8,
    6,
    ['cdd583cf-4711-4f33-a202-c937081afd7e'],
    40,
    [
      '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
    ],
    45,
  ],
];

module.exports = issueSeed;
