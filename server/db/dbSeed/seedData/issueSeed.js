// issues(id, createdDate, modifiedDate, name, body, repo)
const issueSeed = [
  [
    '20619026-0f61-4772-9bb8-36ed643d4dcd', // id
    new Date(), // created date
    new Date(), // modified date
    '1a64925c-858f-42b4-a09c-39d5699375f4', // organization id
    'Date Picker text field shows errors when switching back from Calendar mode ', // name
    '\r\n<!-- READ THIS FIRST -->\r\n<!-- The OBS Studio GitHub issue tracker is **ONLY** to be -->\r\n<!-- used for reporting Bugs that have replication steps. -->\r\n\r\n<!-- You can post Feature Requests here: https://ideas.obsproject.com/ -->\r\n<!-- Get help for Support Issues here: https://obsproject.com/help -->\r\n\r\n<!--- Provide a general summary of the issue in the Title above -->\r\n\r\n## Platform\r\n<!-- Please fill out the following information about your bug report. -->\r\n<!-- If you are on Linux and installed using a package, please list the package type. -->\r\nOperating system and version: FreeBSD 13-CURRENT\r\nOBS Studio version: 921a74296613084b301e89459f0769f62fdb5517 + FreeBSD build fix PRs applied\r\n\r\n## Expected Behavior\r\nWindow Capture (Xcomposite) faithfully reproduces colours from the source window\r\n<!--- Tell us what should happen -->\r\n\r\n## Current Behavior\r\nRed and blue are swapped. In the image below the Firefox window on the right is the source captured with Window Capture.\r\n![colour](https://user-images.githubusercontent.com/1034582/78734129-6987c100-7915-11ea-86d0-2c5a483a87f5.png)\r\n\r\n\r\n## Steps to Reproduce\r\n1. Create a scene with 1 Window Capture (Xcomposite)\r\n2. Use a Firefox window as the source with content \r\n3. Observe R and B swapped\r\n\r\n## Additional information\r\nScreen Capture (XSHM) does not show this issue', // body
    'https://github.com/flutter/flutter', // repo
    ['Javascript', 'Ruby'], // language
    [
      '331127d2-50ea-4366-970d-90a14222f2dc',
      '3f2ac445-94d8-46eb-94b4-6730140edc4e',
      'f0ee8d0a-78cf-4f88-9e58-05ed51296b0a',
    ], // comments
    [], // attempting
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d', // Contributor: Reference to User ID
    42, // rep
    ['517fa5c9-1d6e-4925-8bcc-25c24cd0b95d'], // Watching: Reference to user ID
    20.0, // value
    true, // open
    'bug', // type
  ],
  [
    '34b0c547-5558-4c47-8278-7ef113a1dee0',
    new Date(),
    new Date(),
    '1a64925c-858f-42b4-a09c-39d5699375f4', // organization id
    '[Bug]: Scene Collections with "/" in their name cannot be imported',
    'Instead of adding the scene collection to the list, OBS just doesnt do anything. It closes the dialog, doesnt give an error message. The scene collection is not added.',
    'https://github.com/obsproject/obs-studio',
    ['C', 'C++'],
    [],
    [],
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
    25,
    [],
    0.0,
    false,
    'bug',
  ],
  [
    '0ce2d9ae-ba16-4013-af33-0cbb8cbc37a2',
    new Date(),
    new Date(),
    '79a3ef7b-bf7d-4e4c-abb8-08cd521d5506', // organization id
    '[Physics problems] the kart is sticked (sliding) to wall when exiting your car parking backwards',
    'If you got stick to the wall (at left side -kart is parallel to the wall- for example), and you try to leave backwards (usefull in soccer mode) while braking (right: you still completely stuck; left: you still stuck at 45deg), the kart continue straight backward.',
    'https://github.com/supertuxkart/stk-code',
    ['Perl', 'Rust'],
    [],
    [],
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
    40,
    [
      '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
      'cdd583cf-4711-4f33-a202-c937081afd7e',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
      'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
    ],
    45.5,
    true,
    'bug',
  ],
  [
    'c44c0862-d013-4c32-b28f-9d55f934e00d',
    new Date(),
    new Date(),
    '1a64925c-858f-42b4-a09c-39d5699375f4', // organization id
    '[Bug]: Scene Collections with "/" in their name cannot be imported',
    'Instead of adding the scene collection to the list, OBS just doesnt do anything. It closes the dialog, doesnt give an error message. The scene collection is not added.',
    'https://github.com/obsproject/obs-studio',
    ['C', 'C++'],
    [],
    [],
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
    25,
    [],
    0.0,
    false,
    'bug',
  ],
  [
    '00a4055a-b257-428a-a152-237375bc0899',
    new Date(),
    new Date(),
    '79a3ef7b-bf7d-4e4c-abb8-08cd521d5506', // organization id
    '[Physics problems] the kart is sticked (sliding) to wall when exiting your car parking backwards',
    'If you got stick to the wall (at left side -kart is parallel to the wall- for example), and you try to leave backwards (usefull in soccer mode) while braking (right: you still completely stuck; left: you still stuck at 45deg), the kart continue straight backward.',
    'https://github.com/supertuxkart/stk-code',
    ['Perl', 'Rust'],
    [],
    [],
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
    40,
    [
      '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
      'cdd583cf-4711-4f33-a202-c937081afd7e',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
      'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
    ],
    45.5,
    true,
    'bug',
  ],
  [
    '00a4055a-b227-428a-a152-237375bc0899',
    new Date(),
    new Date(),
    '79a3ef7b-bf7d-4e4c-abb8-08cd521d5506', // organization id
    '[Physics problems] the kart is sticked (sliding) to wall when exiting your car parking backwards',
    'If you got stick to the wall (at left side -kart is parallel to the wall- for example), and you try to leave backwards (usefull in soccer mode) while braking (right: you still completely stuck; left: you still stuck at 45deg), the kart continue straight backward.',
    'https://github.com/supertuxkart/stk-code',
    ['Perl', 'Rust'],
    [],
    [],
    '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
    40,
    [
      '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
      'cdd583cf-4711-4f33-a202-c937081afd7e',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
      'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
    ],
    0,
    true,
    'feature',
  ],
];

module.exports = issueSeed;
