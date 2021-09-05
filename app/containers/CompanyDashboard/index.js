import React, { useEffect } from 'react';
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
import injectSaga from 'utils/injectSaga';

import {
  closeModalState,
  fetchCompanyMatches,
  openModalState,
  saveCandidate,
  selectPosition,
} from './actions';
import reducer from './reducer';
import saga from './saga';
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
  dispatchFetchCompanyMatches,
  dispatchOpenModal,
  dispatchSaveCandidate,
  dispatchSelectPosition,
  isModalOpen,
  positions,
  selectedPosition,
}) => {
  useEffect(() => dispatchFetchCompanyMatches(), []);

  return (
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
};

CompanyDashboard.propTypes = {
  activeStep: T.number.isRequired,
  candidates: T.array.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchFetchCompanyMatches: T.func.isRequired,
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
  dispatchFetchCompanyMatches: () => dispatch(fetchCompanyMatches()),
  dispatchOpenModal: () => dispatch(openModalState()),
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
  dispatchSelectPosition: payload => dispatch(selectPosition(payload)),
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
