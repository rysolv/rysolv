import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import PullRequestCard from 'components/PullRequests/Card';
import EmptyCard from 'components/PullRequests/EmptyCard';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchUserPullRequests } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectPullRequests,
  makeSelectPullRequestsLoading,
  makeSelectPullRequestsError,
} from '../selectors';

import { PullRequestCardWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
const PullRequestOverview = ({
  dispatchFetchUserPullRequests,
  pullRequests,
  loading,
  createSuccess,
  userId,
  error,
}) => {
  useEffect(() => {
    dispatchFetchUserPullRequests({ userId });
    // the listener on createSuccess is only temporary
  }, [createSuccess]);

  return (
    <PullRequestCardWrapper>
      <AsyncRender
        asyncData={pullRequests}
        isRequiredData
        component={PullRequestCard}
        FallbackComponent={EmptyCard}
        error={error}
        loading={loading}
      />
    </PullRequestCardWrapper>
  );
};

PullRequestOverview.propTypes = {
  createSuccess: T.bool,
  dispatchFetchUserPullRequests: T.func,
  error: T.oneOfType([T.object, T.bool]),
  loading: T.bool,
  pullRequests: T.array,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
  createSuccess: makeSelectPullRequests('createSuccess'),
  error: makeSelectPullRequestsError('fetchPullRequests'),
  pullRequests: makeSelectPullRequests('pullRequests'),
  loading: makeSelectPullRequestsLoading('fetchPullRequests'),
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
