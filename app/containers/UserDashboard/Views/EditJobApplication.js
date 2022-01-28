import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { EditJobApplication as EditJobApplicationView } from 'components/JobApplication';

import {
  changeInput,
  clearAlerts,
  editUserResponse,
  fetchQuestions,
  fetchUserResponse,
  inputError,
  resetFormState,
} from '../actions';
import { validateFields, validateOneField } from '../helpers';
import {
  makeSelectUserDashboard,
  makeSelectUserDashboardLoading,
  makeSelectUserDashboardQuestions,
  makeSelectUserDashboardResponseArray,
} from '../selectors';

const EditJobApplication = ({
  alerts,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchEditUserResponse,
  dispatchFetchQuestions,
  dispatchFetchUserResponse,
  dispatchInputError,
  dispatchResetFormState,
  editUserResponseLoading,
  fetchQuestionsLoading,
  fetchUserResponseLoading,
  form: { application: applicationForm },
  formErrors: { application: applicationFormErrors },
  handleNav,
  questions,
  responseArray,
  user,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Edit Job Application';
    dispatchFetchQuestions({ category: 'hiring' });
    dispatchFetchUserResponse();
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState();
    };
  }, []);

  const handleEditUserResponse = () => {
    const { isValidated, validationErrors } = validateFields({
      values: applicationForm,
    });
    if (isValidated) {
      dispatchEditUserResponse({ responseArray });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'application' });
    }
  };

  const handleUpdateFiles = async filesArray => {
    dispatchChangeInput({
      field: 'resume',
      form: 'application',
      value: filesArray,
    });
  };

  const handleValidateInput = ({ field, formType, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: formType,
    });
  };

  return (
    <AsyncRender
      asyncData={user}
      component={EditJobApplicationView}
      error={false}
      isRequiredData
      loading={fetchQuestionsLoading || fetchUserResponseLoading}
      propsToPassDown={{
        alerts,
        dispatchChangeInput,
        dispatchClearAlerts,
        editUserResponseLoading,
        form: applicationForm,
        formErrors: applicationFormErrors,
        handleEditUserResponse,
        handleNav,
        handleUpdateFiles,
        handleValidateInput,
        questions,
      }}
    />
  );
};

EditJobApplication.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchEditUserResponse: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchFetchUserResponse: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  editUserResponseLoading: T.bool.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  fetchUserResponseLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : UserDashboard
   */
  alerts: makeSelectUserDashboard('alerts'),
  editUserResponseLoading: makeSelectUserDashboardLoading('editUserResponse'),
  fetchQuestionsLoading: makeSelectUserDashboardLoading('fetchQuestions'),
  fetchUserResponseLoading: makeSelectUserDashboardLoading('fetchUserResponse'),
  form: makeSelectUserDashboard('form'),
  formErrors: makeSelectUserDashboard('formErrors'),
  questions: makeSelectUserDashboardQuestions(),
  responseArray: makeSelectUserDashboardResponseArray(),
  user: makeSelectUserDashboard('user'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : UserDashboard
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchEditUserResponse: payload => dispatch(editUserResponse(payload)),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchFetchUserResponse: () => dispatch(fetchUserResponse()),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchResetFormState: () => dispatch(resetFormState()),
  /**
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditJobApplication);
