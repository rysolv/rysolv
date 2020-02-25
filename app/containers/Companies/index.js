import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import CompanyCard from 'components/Companies';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { clearAlerts, deleteCompany, fetchCompanies } from './actions';
import {
  makeSelectCompanies,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
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

Companies.propTypes = {
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companies', reducer });
const withSaga = injectSaga({ key: 'companies', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Companies);
