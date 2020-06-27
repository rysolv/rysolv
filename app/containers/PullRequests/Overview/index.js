import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import PullRequests from 'components/PullRequests';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchUserPullRequests } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectPullRequests } from '../selectors';

const PullRequestOverview = ({
  createSuccess,
  dispatchFetchUserPullRequests,
  error,
  loading,
  pullRequests,
  userId,
}) => {
  useEffect(() => {
    dispatchFetchUserPullRequests({ userId });
  }, [createSuccess]);

  return (
    <AsyncRender
      asyncData={pullRequests}
      component={PullRequests}
      error={error}
      isRequiredData
      loading={loading}
    />
  );
};

PullRequestOverview.propTypes = {
  createSuccess: T.bool,
  dispatchFetchUserPullRequests: T.func,
  error: T.oneOfType([T.object, T.string]),
  loading: T.bool,
  pullRequests: T.array,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : PullRequests
   */
  createSuccess: makeSelectPullRequests('createSuccess'),
  error: makeSelectPullRequests('error'),
  loading: makeSelectPullRequests('loading'),
  pullRequests: makeSelectPullRequests('pullRequests'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchFetchUserPullRequests: payload =>
      dispatch(fetchUserPullRequests(payload)),
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
