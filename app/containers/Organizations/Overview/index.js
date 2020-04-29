import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Organizations from 'components/Organizations';
import {
  clearAlerts,
  deleteCompany,
  fetchCompanies,
  fetchInfo,
  inputChange,
  searchCompanies,
} from '../actions';
import {
  makeSelectCompanies,
  makeSelectCompaniesSearchDisabled,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class CompaniesOverview extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchCompanies } = this.props;
    dispatchFetchCompanies();
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
      handleDeleteCompany,
      handleInputChange,
      handleNav,
      handleSearchCompanies,
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
          handleDeleteCompany,
          handleFetchInfo: dispatchFetchInfo,
          handleInputChange,
          handleNav,
          handleSearchCompanies,
          search,
        }}
      />
    );
  }
}

CompaniesOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  organizations: T.array,
  disabled: T.bool.isRequired,
  dispatchFetchCompanies: T.func,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleDeleteCompany: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchCompanies: T.func,
  loading: T.bool,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectCompanies('alerts'),
  organizations: makeSelectCompanies('organizations'),
  disabled: makeSelectCompaniesSearchDisabled('searchInput'),
  error: makeSelectCompaniesError('organizations'),
  loading: makeSelectCompaniesLoading('organizations'),
  search: makeSelectCompanies('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchCompanies: () => dispatch(fetchCompanies()),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDeleteCompany: payload => dispatch(deleteCompany(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchCompanies: payload => dispatch(searchCompanies(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesOverview);
