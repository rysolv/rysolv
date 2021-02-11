import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import JobsView from 'components/Jobs';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { submitJobInfo } from './actions';
import reducer from './reducer';
import saga from './saga';

const Jobs = ({ dispatchSubmitJobInfo, error, loading }) => (
  <JobsView
    dispatchSubmitJobInfo={dispatchSubmitJobInfo}
    error={error}
    loading={loading}
  />
);

Jobs.propTypes = {
  dispatchSubmitJobInfo: T.func.isRequired,
  error: T.string,
  loading: T.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Jobs
     */
    dispatchSubmitJobInfo: payload => dispatch(submitJobInfo(payload)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'jobs', reducer });
const withSaga = injectSaga({ key: 'jobs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Jobs);
