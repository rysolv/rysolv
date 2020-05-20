import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { fetchWatchList } from 'containers/Main/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  addAttempt,
  clearAlerts,
  fetchIssues,
  inputChange,
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
  makeSelectIssuesSearchDisabled,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
const IssuesOverview = ({
  activeUser,
  alerts,
  disabled,
  dispatchFetchIssues,
  dispatchFetchWatchList,
  error,
  handleClearAlerts,
  handleIncrement,
  handleInputChange,
  handleNav,
  handleSearchIssues,
  handleUpvote,
  issues,
  loading,
  params: { searchValue },
  search,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Issues Overview';
    if (searchValue) {
      handleSearchIssues({ value: searchValue });
    } else {
      dispatchFetchIssues();
    }
    return handleClearAlerts;
  }, [searchValue]);
  return (
    <AsyncRender
      asyncData={issues}
      component={IssueCard}
      error={error}
      loading={loading}
      propsToPassDown={{
        activeUser,
        alerts,
        disabled,
        dispatchFetchWatchList,
        handleClearAlerts,
        handleIncrement,
        handleInputChange,
        handleNav,
        handleSearchIssues,
        handleUpvote,
        search,
      }}
    />
  );
};

IssuesOverview.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  disabled: T.bool,
  dispatchFetchIssues: T.func,
  dispatchFetchWatchList: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleIncrement: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  handleUpvote: T.func,
  issues: T.array,
  loading: T.bool,
  params: T.object,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  activeUser: makeSelectAuth('activeUser'),
  alerts: makeSelectIssues('alerts'),
  disabled: makeSelectIssuesSearchDisabled(),
  error: makeSelectIssuesError('issues'),
  issues: makeSelectIssuesFiltered(),
  loading: makeSelectIssuesLoading('issues'),
  search: makeSelectIssues('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Issues
     */
    dispatchFetchIssues: () => dispatch(fetchIssues()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchIssues: payload => dispatch(searchIssues(payload)),
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
    handleIncrement: payload => dispatch(addAttempt(payload)),
    /*
     * Reducer : Main
     */
    dispatchFetchWatchList: payload => dispatch(fetchWatchList(payload)),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
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
