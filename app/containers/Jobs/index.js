import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { CreateJobApplication } from 'components/Jobs';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { getQuestion, useDidUpdateEffect } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeSkillLevel,
  changeView,
  deleteSkill,
  fetchQuestions,
  inputError,
  resetState,
  submitUserResponse,
} from './actions';
import { validateFields } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectJobQuestions,
  makeSelectJobResponseArray,
  makeSelectJobs,
} from './selectors';
import { ViewContainer } from './styledComponents';

const Jobs = ({
  activeUser: { company, isGithubVerified, surveyComplete },
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchChangeView,
  dispatchDeleteSkill,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetState,
  dispatchSubmitUserResponse,
  error,
  form,
  formErrors,
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
    if (isGithubVerified && isSignedIn) {
      if (!surveyComplete) {
        dispatchFetchQuestions({ category: 'hiring' });
      } else {
        handleNav('/dashboard');
        setIsRequiredData(false);
      }
    } else {
      dispatchChangeView({ view: 0 });
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
  const handleSubmit = () => {
    const { isValidated, validationErrors } = validateFields({
      questions,
      values: form,
    });
    if (isValidated) {
      dispatchSubmitUserResponse({ responseArray });
    } else {
      dispatchInputError({ errors: validationErrors, form });
    }
  };
  const handleUpdateFiles = async filesArray => {
    dispatchChangeInput({ field: 'resume', value: filesArray });
  };

  const isCompany = !!company;

  const step = getQuestion();
  const questionProps = questions[step - 1];

  if (step && view === 0) {
    return <Redirect to="/jobs" />;
  }

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={questions}
        component={CreateJobApplication}
        error={error}
        isRequiredData={isRequiredData}
        loading={loading}
        propsToPassDown={{
          dispatchChangeInput,
          dispatchChangeSkillLevel,
          dispatchChangeView,
          dispatchDeleteSkill,
          dispatchInputError,
          error,
          form,
          formErrors,
          handleCancel,
          handleNav,
          handleStart,
          handleSubmit,
          handleUpdateFiles,
          isCompany,
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
    </ViewContainer>
  );
};

Jobs.propTypes = {
  activeUser: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSubmitUserResponse: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
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
  formErrors: makeSelectJobs('formErrors'),
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
    dispatchChangeSkillLevel: payload => dispatch(changeSkillLevel(payload)),
    dispatchChangeView: payload => dispatch(changeView(payload)),
    dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
    dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
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
