import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import CompanyCard from 'components/Companies';
import { clearAlerts, deleteCompany, fetchCompanies } from '../actions';
import {
  makeSelectCompanies,
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
      handleClearAlerts,
      companies,
      dispatchDeleteCompany,
      error,
      handleNav,
      loading,
    } = this.props;

    return (
      <AsyncRender
        asyncData={companies}
        component={CompanyCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          handleClearAlerts,
          handleDelete: dispatchDeleteCompany,
          handleNav,
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
  dispatchDeleteCompany: T.func,
  dispatchFetchCompanies: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleNav: T.func,
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  alerts: makeSelectCompanies('alerts'),
  companies: makeSelectCompanies('companies'),
  error: makeSelectCompaniesError('companies'),
  loading: makeSelectCompaniesLoading('companies'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    dispatchDeleteCompany: payload => dispatch(deleteCompany(payload)),
    dispatchFetchCompanies: () => dispatch(fetchCompanies()),
    handleClearAlerts: () => dispatch(clearAlerts()),
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
