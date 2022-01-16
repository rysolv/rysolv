import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import { EditCompany as EditCompanyView } from 'components/CompanySignUp';

import { editCompany, fetchQuestions, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardQuestions,
} from '../selectors';

const EditCompany = ({
  activeUser,
  alerts,
  companyQuestions,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchEditCompany,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetFormState,
  editCompanyLoading,
  fetchQuestionsLoading,
  form,
  formErrors,
  handleNav,
}) => {
  const { company: { companyId } = {} } = activeUser;
  const { company: companyForm } = form;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchFetchQuestions({ category: 'company' });
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState({ category: 'company' });
    };
  }, []);

  const handleEditCompany = () => {
    const { isValidated, validationErrors } = validateFields({
      values: companyForm,
    });
    if (isValidated) {
      dispatchEditCompany({
        companyId,
        form: companyForm,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'company' });
    }
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'company',
    });
  };

  return (
    <AsyncRender
      asyncData={companyQuestions}
      component={EditCompanyView}
      isRequiredData
      loading={fetchQuestionsLoading}
      propsToPassDown={{
        alerts,
        companyQuestions,
        dispatchChangeInput,
        dispatchClearAlerts,
        editCompanyLoading,
        form,
        formErrors,
        handleEditCompany,
        handleNav,
        handleValidateInput,
      }}
    />
  );
};

EditCompany.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  companyQuestions: T.array.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchEditCompany: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  editCompanyLoading: T.bool.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  alerts: makeSelectCompanyDashboard('alerts'),
  companyQuestions: makeSelectCompanyDashboardQuestions('company'),
  editCompanyLoading: makeSelectCompanyDashboardLoading('editCompany'),
  fetchQuestionsLoading: makeSelectCompanyDashboardLoading('fetchQuestions'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchEditCompany: payload => dispatch(editCompany(payload)),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditCompany);
