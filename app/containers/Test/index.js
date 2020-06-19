/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React from 'react';

import AddPullRequest from '../PullRequests/Add';
import PullRequestOverview from '../PullRequests/Overview';

const Test = () => {
  return (
    <div style={{ width: '60%' }}>
      <h2>Import Pull Request</h2>
      <p>(requires issueId and userId)</p>
      <AddPullRequest
        issueId="20619026-0f61-4772-9bb8-36ed643d4dcd"
        userId="b519b064-b5db-4472-ad1b-00e30bdbfa4c"
      />
      <hr />

      <h2>User Pull Request Cards</h2>
      <p>(requires userId)</p>
      <PullRequestOverview userId="b519b064-b5db-4472-ad1b-00e30bdbfa4c" />
    </div>
  );
};

export default Test;
