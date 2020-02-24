import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AsyncRender from 'components/AsyncRender';
import CompanyCard from 'components/Companies';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { fetchCompanies } from './actions';
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

  render() {
    const { companies, error, loading } = this.props;
    return (
      <AsyncRender
        asyncData={companies}
        component={CompanyCard}
        error={error}
        loading={loading}
      />
    );
  }
}

Companies.propTypes = {
  companies: T.array,
  dispatchFetchCompanies: T.func,
  error: T.oneOfType([T.object, T.bool]),
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  companies: makeSelectCompanies('companies'),
  error: makeSelectCompaniesError('companies'),
  loading: makeSelectCompaniesLoading('companies'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    dispatchFetchCompanies: () => dispatch(fetchCompanies()),
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
