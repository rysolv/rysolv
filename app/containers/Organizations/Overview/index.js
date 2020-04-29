import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Organizations from 'components/Organizations';
import {
  clearAlerts,
  deleteOrganization,
  fetchOrganizations,
  fetchInfo,
  inputChange,
  searchOrganizations,
} from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsSearchDisabled,
  makeSelectOrganizationsError,
  makeSelectOrganizationsLoading,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class OrganizationsOverview extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchOrganizations } = this.props;
    dispatchFetchOrganizations();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      alerts,
      organizations,
      disabled,
      dispatchFetchInfo,
      error,
      handleClearAlerts,
      handleDeleteOrganization,
      handleInputChange,
      handleNav,
      handleSearchOrganizations,
      loading,
      search,
    } = this.props;

    return (
      <AsyncRender
        asyncData={organizations}
        component={Organizations}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          disabled,
          handleClearAlerts,
          handleDeleteOrganization,
          handleFetchInfo: dispatchFetchInfo,
          handleInputChange,
          handleNav,
          handleSearchOrganizations,
          search,
        }}
      />
    );
  }
}

OrganizationsOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  organizations: T.array,
  disabled: T.bool.isRequired,
  dispatchFetchOrganizations: T.func,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleDeleteOrganization: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchOrganizations: T.func,
  loading: T.bool,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectOrganizations('alerts'),
  organizations: makeSelectOrganizations('organizations'),
  disabled: makeSelectOrganizationsSearchDisabled('searchInput'),
  error: makeSelectOrganizationsError('organizations'),
  loading: makeSelectOrganizationsLoading('organizations'),
  search: makeSelectOrganizations('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchOrganizations: () => dispatch(fetchOrganizations()),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDeleteOrganization: payload => dispatch(deleteOrganization(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchOrganizations: payload => dispatch(searchOrganizations(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationsOverview);
