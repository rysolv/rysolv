import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { ModalDialog } from 'components/base_ui';
import CompanyDashboardView from 'components/CompanyDashboard';
import CompanySideNav from 'components/CompanySideNav';
import ScheduleInterviewModal from 'components/ScheduleInterviewModal';
import injectReducer from 'utils/injectReducer';

import {
  closeModalState,
  openModalState,
  saveCandidate,
  selectPosition,
} from './actions';
import reducer from './reducer';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardActiveStep,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyDashboard = ({
  activeStep,
  candidates,
  dispatchCloseModal,
  dispatchOpenModal,
  dispatchSaveCandidate,
  dispatchSelectPosition,
  isModalOpen,
  positions,
  selectedPosition,
}) => (
  <ViewContainer>
    <CompanySideNav
      dispatchSelectPosition={dispatchSelectPosition}
      positions={positions}
      selectedPosition={selectedPosition}
    />
    <CompanyDashboardView
      activeStep={activeStep}
      candidates={candidates}
      dispatchOpenModal={dispatchOpenModal}
      dispatchSaveCandidate={dispatchSaveCandidate}
    />
    <ModalDialog
      Component={ScheduleInterviewModal}
      open={isModalOpen}
      propsToPassDown={{ dispatchCloseModal }}
    />
  </ViewContainer>
);

CompanyDashboard.propTypes = {
  activeStep: T.number.isRequired,
  candidates: T.array.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  activeStep: makeSelectCompanyDashboardActiveStep(),
  candidates: makeSelectCompanyDashboardCandidates(),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
  positions: makeSelectCompanyDashboardPositions(),
  selectedPosition: makeSelectCompanyDashboard('selectedPosition'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchOpenModal: () => dispatch(openModalState()),
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
  dispatchSelectPosition: payload => dispatch(selectPosition(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'companyDashboard', reducer });

export default withRouter(
  compose(
    withReducer,
    withConnect,
  )(CompanyDashboard),
);
