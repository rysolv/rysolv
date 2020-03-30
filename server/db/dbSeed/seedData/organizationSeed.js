// const { v4: uuidv4 } = require('uuid');

const OrganizationSeed = [
  [
    'ddb0ed71-01e8-4a14-a3fd-8d6ee40f131a', // id
    new Date(), // create date
    new Date(), // last modified date
    'Flutter', // name
    'Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.', // description
    'https://github.com/flutter', // repo_url
    'https://flutter.dev/', // website
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'], // issues
    'https://cdn.worldvectorlogo.com/logos/flutter-logo.svg', // logo
    false, // verified
  ],
  [
    '1a64925c-858f-42b4-a09c-39d5699375f4',
    new Date(),
    new Date(),
    'OBS',
    'OBS Studio is software designed for capturing, compositing, encoding, recording, and streaming video content, efficiently. Its distributed under the GNU General Public License v2 (or any later version) - see the accompanying COPYING file for more details.',
    'https://github.com/obsproject/obs-studio',
    'https://obsproject.com/',
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1200px-OBS.svg.png',
    true,
  ],
  [
    '79a3ef7b-bf7d-4e4c-abb8-08cd521d5506',
    new Date(),
    new Date(),
    'SuperTuxKart',
    'SuperTuxKart is a free kart racing game. It focuses on fun and not on realistic kart physics. Instructions can be found on the in-game help page.',
    'https://github.com/supertuxkart/stk-code',
    'https://supertuxkart.net/Main_Page',
    ['20619026-0f61-4772-9bb8-36ed643d4dcd'],
    'https://upload.wikimedia.org/wikipedia/commons/3/37/Logo_de_SuperTuxKart.png',
    true,
  ],
];

module.exports = OrganizationSeed;
