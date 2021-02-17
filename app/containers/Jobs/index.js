import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import JobsView from 'components/Jobs';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { useDidUpdateEffect } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeView,
  fetchQuestions,
  resetState,
  submitUserResponse,
} from './actions';
import { getQuestion } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectJobQuestions,
  makeSelectJobResponseArray,
  makeSelectJobs,
} from './selectors';

const Jobs = ({
  activeUser: { isGithubVerified, isQuestionnaireComplete },
  dispatchChangeInput,
  dispatchChangeView,
  dispatchFetchQuestions,
  dispatchResetState,
  dispatchSubmitUserResponse,
  error,
  form,
  handleNav,
  isSignedIn,
  loading,
  match: { path },
  questions,
  responseArray,
  view,
}) => {
  const [isRequiredData, setIsRequiredData] = useState(true);
  useEffect(() => {
    if (!isQuestionnaireComplete) {
      dispatchFetchQuestions({ category: 'hiring' });
    } else {
      dispatchChangeView({ view: 2 });
      setIsRequiredData(false);
    }
    return dispatchResetState;
  }, []);

  useDidUpdateEffect(() => {
    if (!isSignedIn) {
      dispatchResetState();
      handleCancel();
    }
  }, [isSignedIn]);

  const handleCancel = () => {
    dispatchChangeView({ view: 0 });
    handleNav(`${path}`);
  };
  const handleStart = () => {
    dispatchChangeView({ view: 1 });
    handleNav(`${path}?question=1`);
  };
  const handleSubmit = () => dispatchSubmitUserResponse({ responseArray });

  const step = getQuestion();
  const questionProps = questions[step - 1];

  if (step && view === 0) {
    return <Redirect to="/jobs" />;
  }

  return (
    <AsyncRender
      asyncData={questions}
      component={JobsView}
      error={error}
      isRequiredData={isRequiredData}
      loading={loading}
      propsToPassDown={{
        dispatchChangeInput,
        dispatchChangeView,
        error,
        form,
        handleCancel,
        handleNav,
        handleStart,
        handleSubmit,
        isGithubVerified,
        isSignedIn,
        loading,
        path,
        step,
        steps: questions.length,
        view,
        ...questionProps,
      }}
    />
  );
};

Jobs.defaultProp = { step: 1 };

Jobs.propTypes = {
  activeUser: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSubmitUserResponse: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  form: T.object.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
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
  questions: makeSelectJobQuestions(),
  responseArray: makeSelectJobResponseArray(),
  view: makeSelectJobs('view'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Jobs
     */
    dispatchChangeInput: payload => dispatch(changeInput(payload)),
    dispatchChangeView: payload => dispatch(changeView(payload)),
    dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
    dispatchResetState: () => dispatch(resetState()),
    dispatchSubmitUserResponse: payload =>
      dispatch(submitUserResponse(payload)),
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
