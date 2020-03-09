const companies = [
  {
    id: '2434543',
    name: 'OBS Studio',
    description:
      'OBS Studio is software designed for capturing, compositing, encoding, recording, and streaming video content, efficiently.',
    icon:
      'https://dl1.cbsistatic.com/i/2017/09/13/64334dd2-2705-4533-896c-37d1330eec79/d80e113983f6c20342e00cbac2a3259d/imgingest-5782482541192744064.png',
    issues: 33,
    pullRequests: 43,
  },
  {
    id: '56545324',
    name: 'Flutter',
    description:
      "Flutter is Google's SDK for crafting beautiful, fast user experiences for mobile, web and desktop from a single codebase.",
    image:
      'https://secure.meetupstatic.com/photos/event/c/7/f/7/highres_478491191.jpeg',
    issues: 5000,
    pullRequests: 114,
  },
];

const deleteMessage = ' has been successfully deleted.';

const postMessage = 'Company has been added.';

const updateMessage = 'Company information has been updated.';

module.exports = { deleteMessage, companies, postMessage, updateMessage };
