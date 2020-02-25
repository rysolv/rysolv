import React from 'react';
import T from 'prop-types';

export const IssueContainer = props => (
  <div style={{ border: '1px solid' }}>
    <div className="name">{props.issueName}</div>
    <div className="issueOverview">{props.issueOverview}</div>
  </div>
);

IssueContainer.propTypes = {
  issueName: T.string.isRequired,
  issueOverview: T.string.isRequired,
};

export default IssueContainer;
