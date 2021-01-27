import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Organizations from 'components/Organizations';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchOrganizations,
  resetState,
  searchOrganizations,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFiltered,
  makeSelectOrganizationsLoading,
} from '../selectors';

const OrganizationsOverview = ({
  alerts,
  dispatchFetchOrganizations,
  dispatchResetState,
  error,
  handleClearAlerts,
  handleNav,
  handleSearchOrganizations,
  loading,
  organizations,
  match,
}) => {
  const {
    params: { searchValue },
    path,
  } = match;
  useEffect(() => dispatchResetState, []);

  useEffect(() => {
    if (searchValue) {
      handleSearchOrganizations({ value: searchValue });
    } else {
      dispatchFetchOrganizations();
    }
    return handleClearAlerts;
  }, [searchValue]);

  return (
    <AsyncRender
      asyncData={organizations}
      component={Organizations}
      error={error}
      loading={loading}
      propsToPassDown={{
        alerts,
        handleClearAlerts,
        handleNav,
        path,
      }}
    />
  );
};

OrganizationsOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  dispatchFetchOrganizations: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  handleClearAlerts: T.func,
  handleNav: T.func.isRequired,
  handleSearchOrganizations: T.func,
  loading: T.bool,
  match: T.object.isRequired,
  organizations: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectOrganizations('alerts'),
  error: makeSelectOrganizationsError('organizations'),
  loading: makeSelectOrganizationsLoading('organizations'),
  organizations: makeSelectOrganizationsFiltered(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchOrganizations: () => dispatch(fetchOrganizations()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleSearchOrganizations: payload =>
      dispatch(searchOrganizations(payload)),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationsOverview);
