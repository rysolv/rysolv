import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import IssueCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

const Issues = ({
  activeUser,
  addWatching,
  alerts: { error, success },
  data,
  deviceView,
  dispatchFetchAttemptList,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleClearAlerts,
  handleNav,
  handleUpvote,
  height,
  isSignedIn,
  path,
}) => {
  const { length } = data;
  const hasData = length > 0 && !data.includes(null);
  const propsToPassDown = {
    activeUser,
    addWatching,
    data,
    deviceView,
    dispatchFetchAttemptList,
    dispatchFetchWatchList,
    dispatchOpenModal,
    handleNav,
    handleUpvote,
    height,
    isSignedIn,
    path,
    perPage: 15,
    result: `${length} ${length === 1 ? 'Result' : 'Results'}`,
  };
  const viewToRender = hasData ? (
    <Pagination Component={IssueCard} propsToPassDown={propsToPassDown} />
  ) : (
    <EmptyCard height={height} />
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
  addWatching: T.func,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  data: T.array,
  deviceView: T.string.isRequired,
  dispatchFetchAttemptList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  height: T.number.isRequired,
  isSignedIn: T.bool,
  path: T.string.isRequired,
};

export default Issues;
