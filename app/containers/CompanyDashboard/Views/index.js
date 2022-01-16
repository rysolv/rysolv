import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import CompanySideNav from 'components/CompanySideNav';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  clearAlerts,
  fetchCompany,
  fetchCompanyPositions,
  inputError,
  resetFormState,
  selectPosition,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardView,
} from '../selectors';
import { VerticalDivider, ViewContainer } from '../styledComponents';
import viewDictionary from '../viewDictionary';

const CompanyDashboard = ({
  activeUser,
  company,
  deviceView,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchFetchCompany,
  dispatchFetchCompanyPositions,
  dispatchResetFormState,
  dispatchSelectPosition,
  fetchCompanyLoading,
  fetchCompanyPositionsLoading,
  handleNav,
  positions,
  selectedPosition,
  shouldRefetchCompany,
  view,
}) => {
  const { company: { companyId } = {} } = activeUser;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchCompanyPositions({ companyId });
  }, []);

  useEffect(() => {
    if (shouldRefetchCompany) {
      dispatchFetchCompany({ companyId });
    }
  }, [shouldRefetchCompany]);

  const ComponentToRender = viewDictionary[view];

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={positions}
        component={() => (
          <Fragment>
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
              activeUser={activeUser}
              dispatchChangeInput={dispatchChangeInput}
              dispatchClearAlerts={dispatchClearAlerts}
              dispatchResetFormState={dispatchResetFormState}
              handleNav={handleNav}
              positions={positions}
              selectedPosition={selectedPosition}
            />
          </Fragment>
        )}
        error={false}
        isRequiredData
        loading={fetchCompanyLoading || fetchCompanyPositionsLoading}
      />
    </ViewContainer>
  );
};

CompanyDashboard.propTypes = {
  activeUser: T.object.isRequired,
  company: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchFetchCompany: T.func.isRequired,
  dispatchFetchCompanyPositions: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  fetchCompanyLoading: T.bool.isRequired,
  fetchCompanyPositionsLoading: T.bool.isRequired,
  handleNav: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
  shouldRefetchCompany: T.bool.isRequired,
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
  company: makeSelectCompanyDashboard('company'),
  fetchCompanyLoading: makeSelectCompanyDashboardLoading('fetchCompany'),
  fetchCompanyPositionsLoading: makeSelectCompanyDashboardLoading(
    'fetchCompanyPositions',
  ),
  positions: makeSelectCompanyDashboard('positions'),
  selectedPosition: makeSelectCompanyDashboard('selectedPosition'),
  shouldRefetchCompany: makeSelectCompanyDashboard('shouldRefetchCompany'),
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
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchClearAlerts: alertType => dispatch(clearAlerts({ alertType })),
  dispatchFetchCompany: payload => dispatch(fetchCompany(payload)),
  dispatchFetchCompanyPositions: payload =>
    dispatch(fetchCompanyPositions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchResetFormState: payload => dispatch(resetFormState(payload)),
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
