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

// eslint-disable-next-line react/prefer-stateless-function
const OrganizationsOverview = ({
  alerts,
  organizations,
  error,
  handleClearAlerts,
  dispatchFetchOrganizations,
  handleNav,
  handleSearchOrganizations,
  loading,
  params: { searchValue },
}) => {
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
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleNav: T.func,
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
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleSearchOrganizations: payload =>
      dispatch(searchOrganizations(payload)),
    /**
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
