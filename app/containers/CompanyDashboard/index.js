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
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeFilter,
  changeInput,
  changeSkillLevel,
  clearAlerts,
  createPosition,
  deleteSkill,
  fetchCompanyPositions,
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
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
  makeSelectCompanyDashboardView,
} from './selectors';
import { VerticalDivider, ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CompanyDashboard = ({
  alerts,
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchCreatePosition,
  dispatchDeleteSkill,
  dispatchFetchCompanyPositions,
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
  questions,
  responseArray,
  selectedPosition,
  tableData,
  view,
}) => {
  useEffect(() => {
    dispatchFetchCompanyPositions();
    dispatchFetchPositionQuestions({ category: 'company_position' });
  }, []);

  useEffect(() => {
    dispatchFetchPositionCandidates({ positionId: selectedPosition });
  }, [selectedPosition]);

  const ComponentToRender = viewDictionary[view];

  const handleCreatePosition = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchCreatePosition({ responseArray });
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
        dispatchDeleteSkill={dispatchDeleteSkill}
        dispatchOpenModal={dispatchOpenModal}
        dispatchResetFormState={dispatchResetFormState}
        dispatchSaveCandidate={dispatchSaveCandidate}
        filter={filter}
        form={form}
        formErrors={formErrors}
        handleCreatePosition={handleCreatePosition}
        handleNav={handleNav}
        handleValidateInput={handleValidateInput}
        loading={loading}
        positions={positions}
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
  alerts: T.object.isRequired,
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCreatePosition: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchCompanyPositions: T.func.isRequired,
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
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
  selectedPosition: T.string.isRequired,
  tableData: T.object.isRequired,
  view: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
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
  dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
  dispatchFetchCompanyPositions: payload =>
    dispatch(fetchCompanyPositions(payload)),
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
