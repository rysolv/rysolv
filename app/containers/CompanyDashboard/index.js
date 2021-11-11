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
  editPosition,
  fetchCompanyPositions,
  fetchPosition,
  fetchPositionCandidates,
  fetchPositionQuestions,
  inputError,
  notifyCandidate,
  openModalState,
  resetFormState,
  saveCandidate,
  selectPosition,
} from './actions';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPosition,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
  makeSelectCompanyDashboardView,
} from './selectors';
import { VerticalDivider, ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CompanyDashboard = ({
  activeUser,
  alerts,
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchCreatePosition,
  dispatchDeletePosition,
  dispatchDeleteSkill,
  dispatchEditPosition,
  dispatchFetchCompanyPositions,
  dispatchFetchPosition,
  dispatchFetchPositionCandidates,
  dispatchFetchPositionQuestions,
  dispatchInputError,
  dispatchNotifyCandidate,
  dispatchOpenModal,
  dispatchResetFormState,
  dispatchSaveCandidate,
  dispatchSelectPosition,
  filter,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  loading,
  positions,
  positionTitle,
  questions,
  responseArray,
  selectedPosition,
  tableData,
  view,
}) => {
  const {
    company: { companyId, isContractAccepted, isQuestionnaireComplete } = {},
  } = activeUser;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchCompanyPositions({ companyId });
    dispatchFetchPositionQuestions({ category: 'company_position' });
  }, []);

  useEffect(() => {
    dispatchFetchPositionCandidates({ positionId: selectedPosition });
  }, [selectedPosition]);

  useEffect(() => {
    if (!isContractAccepted || !isQuestionnaireComplete) {
      handleNav('/company/signup');
    }
  }, [isContractAccepted, isQuestionnaireComplete]);

  const ComponentToRender = viewDictionary[view];

  const handleCreatePosition = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchCreatePosition({ companyId, responseArray });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'createPosition' });
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
      dispatchInputError({ errors: validationErrors, form: 'createPosition' });
    }
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'createPosition',
    });
  };

  return (
    <ViewContainer>
      <CompanySideNav
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
        filter={filter}
        form={form}
        formErrors={formErrors}
        handleCreatePosition={handleCreatePosition}
        handleEditPosition={handleEditPosition}
        handleNav={handleNav}
        handleValidateInput={handleValidateInput}
        loading={loading}
        positions={positions}
        positionTitle={positionTitle}
        questions={questions}
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
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCreatePosition: T.func.isRequired,
  dispatchDeletePosition: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchEditPosition: T.func.isRequired,
  dispatchFetchCompanyPositions: T.func.isRequired,
  dispatchFetchPosition: T.func.isRequired,
  dispatchFetchPositionCandidates: T.func.isRequired,
  dispatchFetchPositionQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  filter: T.object.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  positions: T.array.isRequired,
  positionTitle: T.string,
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
  selectedPosition: T.string.isRequired,
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
  filter: makeSelectCompanyDashboard('filter'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
  loading: makeSelectCompanyDashboard('loading'),
  positions: makeSelectCompanyDashboard('positions'),
  positionTitle: makeSelectCompanyDashboardPosition('title'),
  questions: makeSelectCompanyDashboardQuestions(),
  responseArray: makeSelectCompanyDashboardResponseArray(),
  selectedPosition: makeSelectCompanyDashboard('selectedPosition'),
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
  dispatchEditPosition: payload => dispatch(editPosition(payload)),
  dispatchFetchCompanyPositions: payload =>
    dispatch(fetchCompanyPositions(payload)),
  dispatchFetchPosition: payload => dispatch(fetchPosition(payload)),
  dispatchFetchPositionCandidates: payload =>
    dispatch(fetchPositionCandidates(payload)),
  dispatchFetchPositionQuestions: payload =>
    dispatch(fetchPositionQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchNotifyCandidate: payload => dispatch(notifyCandidate(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchResetFormState: () => dispatch(resetFormState()),
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
