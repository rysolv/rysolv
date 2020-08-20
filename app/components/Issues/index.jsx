import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import IssueCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

const Issues = ({
  activeUser,
  alerts: { error, success },
  data,
  deviceView,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleClearAlerts,
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
    <Pagination Component={IssueCard} propsToPassDown={propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <StyledErrorSuccessBanner
        error={error}
        onClose={handleClearAlerts}
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
  data: T.array,
  deviceView: T.string.isRequired,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default Issues;
