import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Companies from 'components/Companies';
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
      companies,
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
        asyncData={companies}
        component={Companies}
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
  companies: T.array,
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
   * Reducer : Companies
   */
  alerts: makeSelectCompanies('alerts'),
  companies: makeSelectCompanies('companies'),
  disabled: makeSelectCompaniesSearchDisabled('companyInput'),
  error: makeSelectCompaniesError('companies'),
  loading: makeSelectCompaniesLoading('companies'),
  search: makeSelectCompanies('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
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
