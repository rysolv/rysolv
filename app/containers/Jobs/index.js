import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import JobsView from 'components/Jobs';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { changeInput, changeStep, submitJobInfo } from './actions';
import { surveyQuestions } from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeSelectJobs } from './selectors';

const Jobs = ({
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchSubmitJobInfo,
  error,
  form,
  loading,
  requestBody,
  step,
}) => {
  const handleSubmit = () => dispatchSubmitJobInfo({ requestBody });
  const surveyProps = surveyQuestions[step];
  return (
    <JobsView
      dispatchChangeInput={dispatchChangeInput}
      dispatchChangeStep={dispatchChangeStep}
      error={error}
      form={form}
      handleSubmit={handleSubmit}
      loading={loading}
      step={step}
      steps={surveyQuestions.length}
      {...surveyProps}
    />
  );
};

Jobs.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchSubmitJobInfo: T.func.isRequired,
  error: T.string,
  form: T.object.isRequired,
  loading: T.bool.isRequired,
  requestBody: T.object,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Jobs
   */
  error: makeSelectJobs('error'),
  form: makeSelectJobs('form'),
  loading: makeSelectJobs('loading'),
  requestBody: makeSelectJobs('requestBody'),
  step: makeSelectJobs('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Jobs
     */
    dispatchChangeInput: payload => dispatch(changeInput(payload)),
    dispatchChangeStep: payload => dispatch(changeStep(payload)),
    dispatchSubmitJobInfo: payload => dispatch(submitJobInfo(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'jobs', reducer });
const withSaga = injectSaga({ key: 'jobs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Jobs);
