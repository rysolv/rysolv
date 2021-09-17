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
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeFilter,
  changeInput,
  fetchCompanyMatches,
  notifyCandidate,
  openModalState,
  resetModalState,
  saveCandidate,
  selectPosition,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
} from './selectors';
import { VerticalDivider, ViewContainer } from './styledComponents';

const CompanyDashboard = ({
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchChangeInput,
  dispatchFetchCompanyMatches,
  dispatchNotifyCandidate,
  dispatchOpenModal,
  dispatchResetModalState,
  dispatchSaveCandidate,
  dispatchSelectPosition,
  filter,
  form,
  formErrors,
  isModalOpen,
  positions,
  selectedPosition,
}) => {
  useEffect(() => {
    dispatchFetchCompanyMatches();
  }, []);

  return (
    <ViewContainer>
      <CompanySideNav
        deviceView={deviceView}
        dispatchSelectPosition={dispatchSelectPosition}
        positions={positions}
        selectedPosition={selectedPosition}
      />
      <VerticalDivider />
      <CompanyDashboardView
        candidates={candidates}
        dispatchChangeFilter={dispatchChangeFilter}
        dispatchOpenModal={dispatchOpenModal}
        dispatchSaveCandidate={dispatchSaveCandidate}
        filter={filter}
      />
      <ModalDialog
        Component={ScheduleInterviewModal}
        open={isModalOpen}
        propsToPassDown={{
          dispatchChangeInput,
          dispatchNotifyCandidate,
          dispatchResetModalState,
          form,
          formErrors,
        }}
      />
    </ViewContainer>
  );
};

CompanyDashboard.propTypes = {
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchFetchCompanyMatches: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  filter: T.object.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  candidates: makeSelectCompanyDashboardCandidates(),
  filter: makeSelectCompanyDashboard('filter'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
  positions: makeSelectCompanyDashboardPositions(),
  selectedPosition: makeSelectCompanyDashboard('selectedPosition'),
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
  dispatchFetchCompanyMatches: () => dispatch(fetchCompanyMatches()),
  dispatchNotifyCandidate: payload => dispatch(notifyCandidate(payload)),
  dispatchOpenModal: () => dispatch(openModalState()),
  dispatchResetModalState: () => dispatch(resetModalState()),
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
