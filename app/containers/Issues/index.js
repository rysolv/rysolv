import React from 'react';
import IssueContainer from './IssueContainer';

const dummyIssues = [
  {
    issueName: 'WEBM Bug',
    issueOverview: 'Idk dude it just doesnt work',
  },
  {
    issueName: 'Stack overflow',
    issueOverview: 'I thought it was just a website name',
  },
  {
    issueName: 'Full list of AngularJS directives?',
    issueOverview:
      'Im learning AngularJS. Is there a good comprehensive list of all the out-of-the-box directives?',
  },
];

const issueList = dummyIssues.map(issue => (
  <IssueContainer
    issueName={issue.issueName}
    issueOverview={issue.issueOverview}
    key={issue.issueName}
  />
));

export const Issues = () => (
  <div>
    <div className="header">Issues:</div>
    <div className="body">{issueList}</div>
  </div>
);

export default Issues;
