import React, { Fragment } from 'react';
import T from 'prop-types';

import EmptyCard from './EmptyCard';
import PullRequestsCard from './Card';

const PullRequests = ({ data }) => {
  const hasPullRequests = data.length > 0 && !data.includes(null);
  const propsToPassDown = { data };
  const viewToRender = hasPullRequests ? (
    <PullRequestsCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return <Fragment>{viewToRender}</Fragment>;
};

PullRequests.propTypes = {
  data: T.array.isRequired,
};

export default PullRequests;
