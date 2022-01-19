import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import JobsBoardView from 'components/JobsBoard';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchJobsBoard } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectJobsBoard, makeSelectJobsBoardLoading } from './selectors';
import { ViewContainer } from './styledComponents';

const JobsBoard = ({
  dispatchFetchJobsBoard,
  error,
  fetchJobsBoardLoading,
  jobs,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jobs Board';
    dispatchFetchJobsBoard();
  }, []);

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={jobs}
        component={JobsBoardView}
        error={error}
        isRequiredData
        loading={fetchJobsBoardLoading}
        propsToPassDown={{ jobs }}
      />
    </ViewContainer>
  );
};

JobsBoard.propTypes = {
  dispatchFetchJobsBoard: T.func.isRequired,
  error: T.bool.isRequired,
  fetchJobsBoardLoading: T.bool.isRequired,
  jobs: T.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : JobsBoard
   */
  error: makeSelectJobsBoard('error'),
  fetchJobsBoardLoading: makeSelectJobsBoardLoading('fetchJobsBoard'),
  jobs: makeSelectJobsBoard('jobs'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : JobsBoard
   */
  dispatchFetchJobsBoard: () => dispatch(fetchJobsBoard()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'jobsBoard', reducer });
const withSaga = injectSaga({ key: 'jobsBoard', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(JobsBoard),
);
