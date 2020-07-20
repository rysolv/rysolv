import React, { Fragment } from 'react';
import T from 'prop-types';

import EmptyCard from './EmptyCard';
import IssueCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

const Issues = ({
  activeUser,
  alerts: { error, success },
  clearAlerts,
  data,
  deviceView,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleIncrement,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => {
  const hasData = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    activeUser,
    data,
    deviceView,
    dispatchFetchWatchList,
    dispatchOpenModal,
    handleIncrement,
    handleNav,
    handleUpvote,
    isSignedIn,
  };
  const viewToRender = hasData ? (
    <IssueCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <StyledErrorSuccessBanner
        error={error}
        onClose={clearAlerts}
        success={success}
      />
      {viewToRender}
    </Fragment>
  );
};

Issues.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  deviceView: T.string.isRequired,
  disabled: T.bool.isRequired,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  search: T.object,
};

export default Issues;
