const comments = [
  {
    rysolv: true,
    platform: 'Rysolv',
    posted: '6/14/19',
    replies: 2,
    body: '[<p>Stuff here</p>]',
    user: 'Tyler Maran',
  },
  {
    rysolv: false,
    platform: 'Github',
    posted: '2/13/20',
    replies: 0,
    body: '[<p>All of our test will actully be HTML formated</p>]',
    user: 'Anna Po',
  },
  {
    rysolv: false,
    platform: 'Github',
    posted: '1/12/20',
    replies: 0,
    body: '[<p>Or maybe markdown</p>]',
    user: 'Paul',
  },
];

const deleteMessage = ' has been successfully deleted.';

module.exports = { deleteMessage, comments };
