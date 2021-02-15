import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import JobsView from 'components/Jobs';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { changeInput, submitJobInfo } from './actions';
import { surveyQuestions } from './constants';
import { getQuestion } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectJobs } from './selectors';

const Jobs = ({
  activeUser: { isGithubVerified },
  dispatchChangeInput,
  dispatchSubmitJobInfo,
  error,
  form,
  handleNav,
  isSignedIn,
  loading,
  match: { path },
  requestBody,
  view,
}) => {
  const handleSubmit = () => dispatchSubmitJobInfo({ requestBody });
  const step = getQuestion();
  const surveyProps = surveyQuestions[step - 1];
  return (
    <JobsView
      dispatchChangeInput={dispatchChangeInput}
      error={error}
      form={form}
      handleNav={handleNav}
      handleSubmit={handleSubmit}
      isGithubVerified={isGithubVerified}
      isSignedIn={isSignedIn}
      loading={loading}
      path={path}
      step={step}
      steps={surveyQuestions.length}
      view={view}
      {...surveyProps}
    />
  );
};

Jobs.defaultProp = { step: 1 };

Jobs.propTypes = {
  activeUser: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchSubmitJobInfo: T.func.isRequired,
  error: T.string,
  form: T.object.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  requestBody: T.object,
  view: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer : Jobs
   */
  error: makeSelectJobs('error'),
  form: makeSelectJobs('form'),
  loading: makeSelectJobs('loading'),
  requestBody: makeSelectJobs('requestBody'),
  view: makeSelectJobs('view'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Jobs
     */
    dispatchChangeInput: payload => dispatch(changeInput(payload)),
    dispatchSubmitJobInfo: payload => dispatch(submitJobInfo(payload)),
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

const withReducer = injectReducer({ key: 'jobs', reducer });
const withSaga = injectSaga({ key: 'jobs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Jobs);
