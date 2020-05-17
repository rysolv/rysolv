const fetch = require('node-fetch');

const getSingleIssue = issueUrl => {
  console.log('Getting issue from github');
  console.log(issueUrl);

  //
  // lookup url
  // get title, body, link, repo_url
  // lookup repo url
  // get name, description, repo_url, languages
  // create organization (if doesn't exist)
  // create issue
  //

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    'https://api.github.com/repos/obsproject/obs-studio/issues/2675',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

module.exports = {
  getSingleIssue,
};

// const example = {
//   url: 'https://api.github.com/repos/obsproject/obs-studio/issues/2675',
//   repository_url: 'https://api.github.com/repos/obsproject/obs-studio',
//   labels_url:
//     'https://api.github.com/repos/obsproject/obs-studio/issues/2675/labels{/name}',
//   comments_url:
//     'https://api.github.com/repos/obsproject/obs-studio/issues/2675/comments',
//   events_url:
//     'https://api.github.com/repos/obsproject/obs-studio/issues/2675/events',
//   html_url: 'https://github.com/obsproject/obs-studio/issues/2675',
//   id: 596244370,
//   node_id: 'MDU6SXNzdWU1OTYyNDQzNzA=',
//   number: 2675,
//   title: '[BUG] Window Capture (Xcomposite) R/B swapped',
//   user: {
//     login: 'emaste',
//     id: 1034582,
//     node_id: 'MDQ6VXNlcjEwMzQ1ODI=',
//     avatar_url: 'https://avatars2.githubusercontent.com/u/1034582?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/emaste',
//     html_url: 'https://github.com/emaste',
//     followers_url: 'https://api.github.com/users/emaste/followers',
//     following_url: 'https://api.github.com/users/emaste/following{/other_user}',
//     gists_url: 'https://api.github.com/users/emaste/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/emaste/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/emaste/subscriptions',
//     organizations_url: 'https://api.github.com/users/emaste/orgs',
//     repos_url: 'https://api.github.com/users/emaste/repos',
//     events_url: 'https://api.github.com/users/emaste/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/emaste/received_events',
//     type: 'User',
//     site_admin: false,
//   },
//   labels: [
//     {
//       id: 1652703726,
//       node_id: 'MDU6TGFiZWwxNjUyNzAzNzI2',
//       url: 'https://api.github.com/repos/obsproject/obs-studio/labels/Linux',
//       name: 'Linux',
//       color: '709bc9',
//       default: false,
//       description: 'This issue exclusively affects Linux',
//     },
//   ],
//   state: 'open',
//   locked: false,
//   assignee: null,
//   assignees: [],
//   milestone: null,
//   comments: 3,
//   created_at: '2020-04-08T01:19:40Z',
//   updated_at: '2020-04-26T06:09:09Z',
//   closed_at: null,
//   author_association: 'CONTRIBUTOR',
//   body:
//     '\r\n' +
//     '<!-- READ THIS FIRST -->\r\n' +
//     '<!-- The OBS Studio GitHub issue tracker is **ONLY** to be -->\r\n' +
//     '<!-- used for reporting Bugs that have replication steps. -->\r\n' +
//     '\r\n' +
//     '<!-- You can post Feature Requests here: https://ideas.obsproject.com/ -->\r\n' +
//     '<!-- Get help for Support Issues here: https://obsproject.com/help -->\r\n' +
//     '\r\n' +
//     '<!--- Provide a general summary of the issue in the Title above -->\r\n' +
//     '\r\n' +
//     '## Platform\r\n' +
//     '<!-- Please fill out the following information about your bug report. -->\r\n' +
//     '<!-- If you are on Linux and installed using a package, please list the package type. -->\r\n' +
//     'Operating system and version: FreeBSD 13-CURRENT\r\n' +
//     'OBS Studio version: 921a74296613084b301e89459f0769f62fdb5517 + FreeBSD build fix PRs applied\r\n' +
//     '\r\n' +
//     '## Expected Behavior\r\n' +
//     'Window Capture (Xcomposite) faithfully reproduces colours from the source window\r\n' +
//     '<!--- Tell us what should happen -->\r\n' +
//     '\r\n' +
//     '## Current Behavior\r\n' +
//     'Red and blue are swapped. In the image below the Firefox window on the right is the source captured with Window Capture.\r\n' +
//     '![colour](https://user-images.githubusercontent.com/1034582/78734129-6987c100-7915-11ea-86d0-2c5a483a87f5.png)\r\n' +
//     '\r\n' +
//     '\r\n' +
//     '## Steps to Reproduce\r\n' +
//     '1. Create a scene with 1 Window Capture (Xcomposite)\r\n' +
//     '2. Use a Firefox window as the source with content \r\n' +
//     '3. Observe R and B swapped\r\n' +
//     '\r\n' +
//     '## Additional information\r\n' +
//     'Screen Capture (XSHM) does not show this issue',
//   closed_by: null,
// };
