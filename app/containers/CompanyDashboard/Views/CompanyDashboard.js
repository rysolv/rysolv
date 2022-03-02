import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import CompanyDashboardView from 'components/CompanyDashboard';
import ScheduleInterviewModal from 'components/ScheduleInterviewModal';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeFilter,
  closeModalState,
  fetchCandidateCount,
  fetchPositionCandidates,
  notifyCandidate,
  openModalState,
  saveCandidate,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardPosition,
} from '../selectors';

const CompanyDashboard = ({
  candidateCount,
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchCloseModal,
  dispatchFetchCandidateCount,
  dispatchFetchPositionCandidates,
  dispatchNotifyCandidate,
  dispatchOpenModal,
  dispatchResetFormState,
  dispatchSaveCandidate,
  fetchPositionCandidatesLoading,
  filter,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  matchCandidatesLoading,
  messageAlerts,
  positions,
  positionTitle,
  selectedPosition,
  shouldRefetchCandidates,
  tableData,
}) => {
  useEffect(() => dispatchClearAlerts, []);

  useEffect(() => {
    if (selectedPosition && shouldRefetchCandidates) {
      const { step } = filter;
      dispatchFetchCandidateCount({ positionId: selectedPosition });
      dispatchFetchPositionCandidates({
        positionId: selectedPosition,
        step,
      });
    }
  }, [selectedPosition, filter]);

  return (
    <Fragment>
      <AsyncRender
        asyncData={candidates}
        component={CompanyDashboardView}
        error={false}
        isRequiredData={false}
        loading={fetchPositionCandidatesLoading}
        propsToPassDown={{
          candidateCount,
          candidates,
          deviceView,
          dispatchChangeFilter,
          dispatchOpenModal,
          dispatchSaveCandidate,
          filter,
          handleNav,
          matchCandidatesLoading,
          positions,
          positionTitle,
          selectedPosition,
        }}
      />
      <ModalDialog
        Component={ScheduleInterviewModal}
        open={isModalOpen}
        propsToPassDown={{
          dispatchChangeInput,
          dispatchClearAlerts,
          dispatchNotifyCandidate,
          dispatchResetFormState,
          form,
          formErrors,
          handleClose: dispatchCloseModal,
          messageAlerts,
          tableData,
        }}
      />
    </Fragment>
  );
};

CompanyDashboard.propTypes = {
  candidateCount: T.object.isRequired,
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchFetchCandidateCount: T.func.isRequired,
  dispatchFetchPositionCandidates: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  fetchPositionCandidatesLoading: T.bool.isRequired,
  filter: T.object.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  matchCandidatesLoading: T.bool.isRequired,
  messageAlerts: T.object.isRequired,
  positions: T.array.isRequired,
  positionTitle: T.string,
  selectedPosition: T.string.isRequired,
  shouldRefetchCandidates: T.bool.isRequired,
  tableData: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  candidateCount: makeSelectCompanyDashboard('candidateCount'),
  candidates: makeSelectCompanyDashboardCandidates(),
  fetchPositionCandidatesLoading: makeSelectCompanyDashboardLoading(
    'fetchPositionCandidates',
  ),
  filter: makeSelectCompanyDashboard('filter'),
  form: makeSelectCompanyDashboard('form'),
  formErrors: makeSelectCompanyDashboard('formErrors'),
  isModalOpen: makeSelectCompanyDashboard('isModalOpen'),
  matchCandidatesLoading: makeSelectCompanyDashboardLoading('matchCandidates'),
  messageAlerts: makeSelectCompanyDashboard('messageAlerts'),
  positionTitle: makeSelectCompanyDashboardPosition('title'),
  shouldRefetchCandidates: makeSelectCompanyDashboard(
    'shouldRefetchCandidates',
  ),
  tableData: makeSelectCompanyDashboard('tableData'),
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
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchFetchCandidateCount: payload =>
    dispatch(fetchCandidateCount(payload)),
  dispatchFetchPositionCandidates: payload =>
    dispatch(fetchPositionCandidates(payload)),
  dispatchNotifyCandidate: payload => dispatch(notifyCandidate(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
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
