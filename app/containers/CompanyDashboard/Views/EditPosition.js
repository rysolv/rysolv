import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import { EditPosition as EditPositionView } from 'components/CompanyPosition';
import { getParameterByName } from 'utils/globalHelpers';

import {
  changeSkillLevel,
  deleteSkill,
  editPosition,
  fetchPosition,
  fetchQuestions,
  inputError,
} from '../actions';
import { validateFields, validateOneField } from '../helpers';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
} from '../selectors';

const EditPosition = ({
  activeUser,
  alerts,
  companyPositionQuestions,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchDeleteSkill,
  dispatchEditPosition,
  dispatchFetchPosition,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetFormState,
  editPositionLoading,
  fetchPositionLoading,
  fetchQuestionsLoading,
  form,
  formErrors,
  handleNav,
  responseArray,
  selectedPosition,
}) => {
  const { company: { companyId } = {} } = activeUser;
  const { companyPosition: companyPositionForm } = form;

  useEffect(() => {
    const positionId = getParameterByName('id');
    window.scrollTo(0, 0);
    document.title = 'Edit Position';
    dispatchFetchPosition({ positionId });
    dispatchFetchQuestions({ category: 'company_position' });
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState({ category: 'companyPosition' });
    };
  }, []);

  const handleEditPosition = () => {
    const { isValidated, validationErrors } = validateFields({
      values: companyPositionForm,
    });
    if (isValidated) {
      dispatchEditPosition({
        companyId,
        positionId: selectedPosition,
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
      component={EditPositionView}
      error={false}
      isRequiredData
      loading={fetchPositionLoading || fetchQuestionsLoading}
      propsToPassDown={{
        alerts,
        companyPositionQuestions,
        dispatchChangeInput,
        dispatchChangeSkillLevel,
        dispatchClearAlerts,
        dispatchDeleteSkill,
        editPositionLoading,
        form,
        formErrors,
        handleEditPosition,
        handleNav,
        handleValidateInput,
      }}
    />
  );
};

EditPosition.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  companyPositionQuestions: T.array.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchEditPosition: T.func.isRequired,
  dispatchFetchPosition: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  editPositionLoading: T.bool.isRequired,
  fetchPositionLoading: T.bool.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  responseArray: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  alerts: makeSelectCompanyDashboard('alerts'),
  companyPositionQuestions: makeSelectCompanyDashboardQuestions(
    'companyPosition',
  ),
  editPositionLoading: makeSelectCompanyDashboardLoading('editPosition'),
  fetchPositionLoading: makeSelectCompanyDashboardLoading('fetchPosition'),
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
  dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
  dispatchEditPosition: payload => dispatch(editPosition(payload)),
  dispatchFetchPosition: payload => dispatch(fetchPosition(payload)),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditPosition);
