import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import PullRequests from 'components/PullRequests';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  deletePullRequest,
  fetchUserPullRequests,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectPullRequests,
  makeSelectPullRequestsLoading,
} from '../selectors';

const PullRequestOverview = ({
  alerts,
  createSuccess,
  dispatchFetchUserPullRequests,
  dispatchResetState,
  error,
  handleClearAlerts,
  handleDelete,
  loading,
  pullRequests,
}) => {
  useEffect(() => dispatchResetState, []);

  useEffect(() => {
    dispatchFetchUserPullRequests();
  }, [createSuccess]);

  return (
    <AsyncRender
      asyncData={pullRequests}
      component={PullRequests}
      error={error}
      isRequiredData={false}
      loading={loading}
      propsToPassDown={{ alerts, handleClearAlerts, handleDelete }}
    />
  );
};

PullRequestOverview.propTypes = {
  alerts: T.object,
  createSuccess: T.bool,
  dispatchFetchUserPullRequests: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  handleClearAlerts: T.func,
  handleDelete: T.func,
  loading: T.bool,
  pullRequests: T.array,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : PullRequests
   */
  alerts: makeSelectPullRequests('alerts'),
  createSuccess: makeSelectPullRequests('createSuccess'),
  error: makeSelectPullRequests('error'),
  loading: makeSelectPullRequestsLoading('default'),
  pullRequests: makeSelectPullRequests('pullRequests'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchFetchUserPullRequests: () => dispatch(fetchUserPullRequests()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDelete: payload => dispatch(deletePullRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pullRequests', reducer });
const withSaga = injectSaga({ key: 'pullRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PullRequestOverview);
