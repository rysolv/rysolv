import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { fetchWatchList, openModalState } from 'containers/Main/actions';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  addWatch,
  clearAlerts,
  fetchIssues,
  searchIssues,
  upvoteIssue,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectIssues,
  makeSelectIssuesError,
  makeSelectIssuesFiltered,
  makeSelectIssuesLoading,
} from '../selectors';

const IssuesOverview = ({
  activeUser,
  addWatching,
  alerts,
  deviceView,
  dispatchFetchIssues,
  dispatchFetchWatchList,
  dispatchOpenModal,
  dispatchUpvote,
  error,
  handleClearAlerts,
  handleSearchIssues,
  isSignedIn,
  issues,
  loading,
  params: { searchValue },
  upvoteLoading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Issues';
    if (searchValue) {
      handleSearchIssues({ value: searchValue });
    } else {
      dispatchFetchIssues();
    }
    return handleClearAlerts;
  }, [searchValue]);

  const handleUpvote = ({ issueId, upvote, userId }) => {
    if (!upvoteLoading) dispatchUpvote({ issueId, upvote, userId });
  };

  return (
    <AsyncRender
      asyncData={issues}
      component={IssueCard}
      error={error}
      loading={loading}
      propsToPassDown={{
        activeUser,
        addWatching,
        alerts,
        deviceView,
        dispatchFetchWatchList,
        dispatchOpenModal,
        handleClearAlerts,
        handleUpvote,
        isSignedIn,
      }}
    />
  );
};

IssuesOverview.propTypes = {
  activeUser: T.object,
  addWatching: T.func,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  deviceView: T.string,
  dispatchFetchIssues: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  dispatchUpvote: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleSearchIssues: T.func,
  isSignedIn: T.bool,
  issues: T.array,
  loading: T.bool,
  params: T.object,
  upvoteLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  error: makeSelectIssuesError('issues'),
  issues: makeSelectIssuesFiltered(),
  loading: makeSelectIssuesLoading('issues'),
  upvoteLoading: makeSelectIssuesLoading('upvoteIssue'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Issues
     */
    addWatching: payload => dispatch(addWatch(payload)),
    dispatchFetchIssues: () => dispatch(fetchIssues()),
    dispatchUpvote: payload => dispatch(upvoteIssue(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleSearchIssues: payload => dispatch(searchIssues(payload)),
    /*
     * Reducer : Main
     */
    dispatchFetchWatchList: payload => dispatch(fetchWatchList(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesOverview);
