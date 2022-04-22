import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import { CreateJobApplication } from 'components/JobApplication';
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
  makeSelectJobApplication,
  makeSelectJobApplicationLoading,
  makeSelectJobApplicationQuestions,
  makeSelectJobApplicationResponseArray,
} from './selectors';
import { ViewContainer } from './styledComponents';

const JobApplication = ({
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
  fetchQuestionsLoading,
  form,
  formErrors,
  handleNav,
  isSignedIn,
  match: { path },
  questions,
  responseArray,
  view,
}) => {
  useEffect(() => {
    if (isGithubVerified && isSignedIn) {
      if (!surveyComplete) {
        dispatchFetchQuestions({ category: 'hiring' });
      }
    } else {
      dispatchChangeView({ view: 0 });
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
    const viewToRender = surveyComplete ? 2 : 1;
    dispatchChangeView({ view: viewToRender });
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
    return <Redirect to="/apply" />;
  }

  return (
    <ViewContainer>
      <ConditionalRender
        Component={
          <AsyncRender
            asyncData={questions}
            component={CreateJobApplication}
            error={error}
            isRequiredData
            loading={fetchQuestionsLoading}
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
              path,
              step,
              steps: questions.length,
              view,
              ...questionProps,
            }}
          />
        }
        FallbackComponent={
          <CreateJobApplication
            handleStart={handleStart}
            isCompany={isCompany}
            isGithubVerified={isGithubVerified}
            isSignedIn={isSignedIn}
            view={view}
          />
        }
        shouldRender={view === 1}
      />
    </ViewContainer>
  );
};

JobApplication.propTypes = {
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
  fetchQuestionsLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
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
   * Reducer : JobApplication
   */
  error: makeSelectJobApplication('error'),
  fetchQuestionsLoading: makeSelectJobApplicationLoading('fetchQuestions'),
  form: makeSelectJobApplication('form'),
  formErrors: makeSelectJobApplication('formErrors'),
  questions: makeSelectJobApplicationQuestions(),
  responseArray: makeSelectJobApplicationResponseArray(),
  view: makeSelectJobApplication('view'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : JobApplication
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

const withReducer = injectReducer({ key: 'jobApplication', reducer });
const withSaga = injectSaga({ key: 'jobApplication', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(JobApplication);
