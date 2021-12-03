import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import { ModalDialog } from 'components/base_ui';
import CompanySideNav from 'components/CompanySideNav';
import ScheduleInterviewModal from 'components/ScheduleInterviewModal';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeFilter,
  changeInput,
  changeSkillLevel,
  clearAlerts,
  createPosition,
  deletePosition,
  deleteSkill,
  editCompany,
  editPosition,
  fetchCompany,
  fetchCompanyPositions,
  fetchPosition,
  fetchPositionCandidates,
  fetchQuestions,
  inputError,
  notifyCandidate,
  openModalState,
  resetFormState,
  saveCandidate,
  selectPosition,
} from '../actions';
import { validateFields, validateOneField } from '../helpers';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardPosition,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
  makeSelectCompanyDashboardView,
} from '../selectors';
import { VerticalDivider, ViewContainer } from '../styledComponents';
import viewDictionary from '../viewDictionary';

const CompanyDashboard = ({
  activeUser,
  alerts,
  candidates,
  company,
  companyPositionQuestions,
  companyQuestions,
  deviceView,
  dispatchChangeFilter,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchCreatePosition,
  dispatchDeletePosition,
  dispatchDeleteSkill,
  dispatchEditCompany,
  dispatchEditPosition,
  dispatchFetchCompany,
  dispatchFetchCompanyPositions,
  dispatchFetchPosition,
  dispatchFetchPositionCandidates,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchNotifyCandidate,
  dispatchOpenModal,
  dispatchResetFormState,
  dispatchSaveCandidate,
  dispatchSelectPosition,
  fetchQuestionsLoading,
  filter,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  loading,
  positions,
  positionTitle,
  responseArray,
  selectedPosition,
  shouldRefetchCompany,
  tableData,
  view,
}) => {
  const { company: { companyId } = {} } = activeUser;
  const { company: companyForm } = form;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchCompanyPositions({ companyId });
    dispatchFetchQuestions({ category: 'company_position' });
    dispatchFetchQuestions({ category: 'company' });
  }, []);

  useEffect(() => {
    dispatchFetchPositionCandidates({ positionId: selectedPosition });
  }, [selectedPosition]);

  useEffect(() => {
    if (shouldRefetchCompany) {
      dispatchFetchCompany({ companyId });
    }
  }, [shouldRefetchCompany]);

  const ComponentToRender = viewDictionary[view];

  const handleCreatePosition = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchCreatePosition({
        companyId,
        responseArray,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'companyPosition' });
    }
  };

  const handleEditCompany = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchEditCompany({
        companyId,
        form: companyForm,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'company' });
    }
  };

  const handleEditPosition = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
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
    <ViewContainer>
      <CompanySideNav
        company={company}
        deviceView={deviceView}
        dispatchSelectPosition={dispatchSelectPosition}
        handleNav={handleNav}
        positions={positions}
        selectedPosition={selectedPosition}
      />
      <VerticalDivider />
      <ComponentToRender
        alerts={alerts}
        candidates={candidates}
        companyPositionQuestions={companyPositionQuestions}
        companyQuestions={companyQuestions}
        dispatchChangeFilter={dispatchChangeFilter}
        dispatchChangeInput={dispatchChangeInput}
        dispatchChangeSkillLevel={dispatchChangeSkillLevel}
        dispatchClearAlerts={dispatchClearAlerts}
        dispatchDeletePosition={dispatchDeletePosition}
        dispatchDeleteSkill={dispatchDeleteSkill}
        dispatchFetchPosition={dispatchFetchPosition}
        dispatchOpenModal={dispatchOpenModal}
        dispatchResetFormState={dispatchResetFormState}
        dispatchSaveCandidate={dispatchSaveCandidate}
        dispatchSelectPosition={dispatchSelectPosition}
        fetchQuestionsLoading={fetchQuestionsLoading}
        filter={filter}
        form={form}
        formErrors={formErrors}
        handleCreatePosition={handleCreatePosition}
        handleEditCompany={handleEditCompany}
        handleEditPosition={handleEditPosition}
        handleNav={handleNav}
        handleValidateInput={handleValidateInput}
        loading={loading}
        positions={positions}
        positionTitle={positionTitle}
        selectedPosition={selectedPosition}
        tableData={tableData}
      />
      <ModalDialog
        Component={ScheduleInterviewModal}
        open={isModalOpen}
        propsToPassDown={{
          alerts,
          dispatchChangeInput,
          dispatchClearAlerts,
          dispatchNotifyCandidate,
          dispatchResetFormState,
          form,
          formErrors,
          tableData,
        }}
      />
    </ViewContainer>
  );
};

CompanyDashboard.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  candidates: T.array.isRequired,
  company: T.object.isRequired,
  companyPositionQuestions: T.array.isRequired,
  companyQuestions: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCreatePosition: T.func.isRequired,
  dispatchDeletePosition: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchEditCompany: T.func.isRequired,
  dispatchEditPosition: T.func.isRequired,
  dispatchFetchCompany: T.func.isRequired,
  dispatchFetchCompanyPositions: T.func.isRequired,
  dispatchFetchPosition: T.func.isRequired,
  dispatchFetchPositionCandidates: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  filter: T.object.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  positions: T.array.isRequired,
  positionTitle: T.string,
  responseArray: T.array.isRequired,
  selectedPosition: T.string.isRequired,
  shouldRefetchCompany: T.bool.isRequired,
  tableData: T.object.isRequired,
  view: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : CompanyDashboard
   */
  alerts: makeSelectCompanyDashboard('alerts'),
  candidates: makeSelectCompanyDashboardCandidates(),
  company: makeSelectCompanyDashboard('company'),
  companyPositionQuestions: makeSelectCompanyDashboardQuestions(
    'companyPosition',
  ),
  companyQuestions: makeSelectCompanyDashboardQuestions('company'),
  fetchQuestionsLoading: makeSelectCompanyDashboardLoading('fetchQuestions'),
  filter: makeSelectCompanyDashboard('filter'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
  loading: makeSelectCompanyDashboardLoading('main'),
  positions: makeSelectCompanyDashboard('positions'),
  positionTitle: makeSelectCompanyDashboardPosition('title'),
  responseArray: makeSelectCompanyDashboardResponseArray(),
  selectedPosition: makeSelectCompanyDashboard('selectedPosition'),
  shouldRefetchCompany: makeSelectCompanyDashboard('shouldRefetchCompany'),
  tableData: makeSelectCompanyDashboard('tableData'),
  view: makeSelectCompanyDashboardView(),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchChangeFilter: payload => dispatch(changeFilter(payload)),
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchChangeSkillLevel: payload => dispatch(changeSkillLevel(payload)),
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchCreatePosition: payload => dispatch(createPosition(payload)),
  dispatchDeletePosition: payload => dispatch(deletePosition(payload)),
  dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
  dispatchEditCompany: payload => dispatch(editCompany(payload)),
  dispatchEditPosition: payload => dispatch(editPosition(payload)),
  dispatchFetchCompany: payload => dispatch(fetchCompany(payload)),
  dispatchFetchCompanyPositions: payload =>
    dispatch(fetchCompanyPositions(payload)),
  dispatchFetchPosition: payload => dispatch(fetchPosition(payload)),
  dispatchFetchPositionCandidates: payload =>
    dispatch(fetchPositionCandidates(payload)),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchNotifyCandidate: payload => dispatch(notifyCandidate(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchResetFormState: payload => dispatch(resetFormState(payload)),
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
  dispatchSelectPosition: payload => dispatch(selectPosition(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'companyDashboard', reducer });
const withSaga = injectSaga({ key: 'companyDashboard', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanyDashboard),
);
