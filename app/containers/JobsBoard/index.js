import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import JobsBoardView from 'components/JobsBoard';
import { getParameterByName } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { changeFilter, fetchJobsBoard } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectJobsBoard,
  makeSelectJobsBoardList,
  makeSelectJobsBoardLoading,
} from './selectors';
import { ViewContainer } from './styledComponents';

const JobsBoard = ({
  dispatchFetchJobsBoard,
  dispatchChangeFilter,
  error,
  fetchJobsBoardLoading,
  filter,
  handleNav,
  jobs,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jobs Board';
    const searchTerm = getParameterByName('search');
    dispatchChangeFilter({ filter: searchTerm || '' });
    dispatchFetchJobsBoard();
  }, []);

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={jobs}
        component={JobsBoardView}
        error={error}
        isRequiredData={false}
        loading={fetchJobsBoardLoading}
        propsToPassDown={{ dispatchChangeFilter, filter, handleNav, jobs }}
      />
    </ViewContainer>
  );
};

JobsBoard.propTypes = {
  dispatchChangeFilter: T.func.isRequired,
  dispatchFetchJobsBoard: T.func.isRequired,
  error: T.bool.isRequired,
  fetchJobsBoardLoading: T.bool.isRequired,
  filter: T.string.isRequired,
  handleNav: T.func.isRequired,
  jobs: T.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : JobsBoard
   */
  error: makeSelectJobsBoard('error'),
  fetchJobsBoardLoading: makeSelectJobsBoardLoading('fetchJobsBoard'),
  filter: makeSelectJobsBoard('filter'),
  jobs: makeSelectJobsBoardList(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : JobsBoard
   */
  dispatchChangeFilter: payload => dispatch(changeFilter(payload)),
  dispatchFetchJobsBoard: () => dispatch(fetchJobsBoard()),
  /**
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
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
