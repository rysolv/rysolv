import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { ModalDialog } from 'components/base_ui';
import CompanyDashboardView from 'components/CompanyDashboard';
import ScheduleInterviewModal from 'components/ScheduleInterviewModal';
import injectReducer from 'utils/injectReducer';

import { closeModalState, openModalState, saveCandidate } from './actions';
import reducer from './reducer';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyDashboard = ({
  candidates,
  dispatchCloseModal,
  dispatchOpenModal,
  dispatchSaveCandidate,
  isModalOpen,
}) => (
  <ViewContainer>
    <CompanyDashboardView
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
  candidates: T.array.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  candidates: makeSelectCompanyDashboardCandidates(),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchOpenModal: () => dispatch(openModalState()),
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
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
