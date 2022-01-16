import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import { CreatePosition as CreatePositionView } from 'components/CompanyPosition';

import {
  changeSkillLevel,
  createPosition,
  deleteSkill,
  fetchQuestions,
  inputError,
  selectPosition,
} from '../actions';
import { validateFields, validateOneField } from '../helpers';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
} from '../selectors';

const CreatePosition = ({
  activeUser,
  alerts,
  companyPositionQuestions,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchDeleteSkill,
  dispatchCreatePosition,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetFormState,
  dispatchSelectPosition,
  fetchQuestionsLoading,
  form,
  formErrors,
  handleNav,
  createPositionLoading,
  positions,
  responseArray,
}) => {
  const { company: { companyId } = {} } = activeUser;
  const { companyPosition: companyPositionForm } = form;

  useEffect(() => {
    dispatchFetchQuestions({ category: 'company_position' });
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState({ category: 'companyPosition' });
    };
  }, []);

  const handleCreatePosition = () => {
    const { isValidated, validationErrors } = validateFields({
      values: companyPositionForm,
    });
    if (isValidated) {
      dispatchCreatePosition({
        companyId,
        responseArray,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'companyPosition' });
    }
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'companyPosition',
    });
  };

  return (
    <AsyncRender
      asyncData={companyPositionQuestions}
      component={CreatePositionView}
      error={false}
      isRequiredData
      loading={fetchQuestionsLoading}
      propsToPassDown={{
        alerts,
        companyPositionQuestions,
        dispatchChangeInput,
        dispatchChangeSkillLevel,
        dispatchClearAlerts,
        dispatchDeleteSkill,
        dispatchSelectPosition,
        form,
        formErrors,
        handleCreatePosition,
        handleNav,
        handleValidateInput,
        createPositionLoading,
        positions,
      }}
    />
  );
};

CreatePosition.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  companyPositionQuestions: T.array.isRequired,
  createPositionLoading: T.bool.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCreatePosition: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  positions: T.array.isRequired,
  responseArray: T.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  alerts: makeSelectCompanyDashboard('alerts'),
  companyPositionQuestions: makeSelectCompanyDashboardQuestions(
    'companyPosition',
  ),
  createPositionLoading: makeSelectCompanyDashboardLoading('createPosition'),
  fetchQuestionsLoading: makeSelectCompanyDashboardLoading('fetchQuestions'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
  responseArray: makeSelectCompanyDashboardResponseArray(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchChangeSkillLevel: payload => dispatch(changeSkillLevel(payload)),
  dispatchCreatePosition: payload => dispatch(createPosition(payload)),
  dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchSelectPosition: payload => dispatch(selectPosition(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreatePosition);
