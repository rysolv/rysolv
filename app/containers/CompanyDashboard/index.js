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
  clearAlerts,
  createPosition,
  deleteSkill,
  fetchCompanyMatches,
  fetchPositionQuestions,
  inputError,
  notifyCandidate,
  openModalState,
  resetModalState,
  saveCandidate,
  selectPosition,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
  makeSelectCompanyDashboardQuestions,
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
  dispatchClearAlerts,
  dispatchCreatePosition,
  dispatchDeleteSkill,
  dispatchFetchCompanyMatches,
  dispatchFetchPositionQuestions,
  dispatchInputError,
  dispatchNotifyCandidate,
  dispatchOpenModal,
  dispatchResetModalState,
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
  selectedPosition,
  tableData,
  view,
}) => {
  useEffect(() => {
    dispatchFetchCompanyMatches();
    dispatchFetchPositionQuestions({ category: 'position' });
  }, []);

  const ComponentToRender = viewDictionary[view];

  const handleCreatePosition = () => {
    dispatchCreatePosition();
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
        candidates={candidates}
        dispatchChangeFilter={dispatchChangeFilter}
        dispatchChangeInput={dispatchChangeInput}
        dispatchDeleteSkill={dispatchDeleteSkill}
        dispatchOpenModal={dispatchOpenModal}
        dispatchSaveCandidate={dispatchSaveCandidate}
        filter={filter}
        form={form}
        formErrors={formErrors}
        handleCreatePosition={handleCreatePosition}
        handleNav={handleNav}
        handleValidateInput={handleValidateInput}
        loading={loading}
        questions={questions}
        selectedPosition={selectedPosition}
      />
      <ModalDialog
        Component={ScheduleInterviewModal}
        open={isModalOpen}
        propsToPassDown={{
          alerts,
          dispatchChangeInput,
          dispatchClearAlerts,
          dispatchNotifyCandidate,
          dispatchResetModalState,
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
  dispatchClearAlerts: T.func.isRequired,
  dispatchCreatePosition: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchCompanyMatches: T.func.isRequired,
  dispatchFetchPositionQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
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
  positions: makeSelectCompanyDashboardPositions(),
  questions: makeSelectCompanyDashboardQuestions(),
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
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchCreatePosition: payload => dispatch(createPosition(payload)),
  dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
  dispatchFetchCompanyMatches: () => dispatch(fetchCompanyMatches()),
  dispatchFetchPositionQuestions: payload =>
    dispatch(fetchPositionQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchNotifyCandidate: payload => dispatch(notifyCandidate(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchResetModalState: () => dispatch(resetModalState()),
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
