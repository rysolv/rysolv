import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
  handleSearchOrganizations,
  loading,
  organizations,
  params: { searchValue },
}) => {
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
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleSearchOrganizations: T.func,
  loading: T.bool,
  organizations: T.array,
  params: T.object,
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
