import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import CompanyDetailView from 'components/Companies/Detail/CompanyDetailView';

import {
  fetchInfo,
  inputChange,
  searchContributors,
  searchIssues,
} from '../actions';
import {
  makeSelectCompanies,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
  makeSelectCompaniesSearchDisabled,
} from '../selectors';
import { DetailWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class DetailCompany extends React.PureComponent {
  componentDidMount() {
    const {
      dispatchFetchInfo,
      match: {
        params: { id },
      },
    } = this.props;
    dispatchFetchInfo({ itemId: id });
  }

  render() {
    const {
      data,
      disabledContributors,
      disabledIssues,
      error,
      handleInputChange,
      handleNav,
      handleSearchContributors,
      handleSearchIssues,
      loading,
      search,
    } = this.props;

    return (
      <DetailWrapper>
        <AsyncRender
          asyncData={data}
          component={CompanyDetailView}
          error={error}
          loading={loading}
          propsToPassDown={{
            disabledContributors,
            disabledIssues,
            handleInputChange,
            handleNav,
            handleSearchContributors,
            handleSearchIssues,
            search,
          }}
        />
      </DetailWrapper>
    );
  }
}

DetailCompany.propTypes = {
  data: T.object,
  disabledContributors: T.bool,
  disabledIssues: T.bool,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  handleSearchContributors: T.func,
  handleSearchIssues: T.func,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('company'),
  disabledContributors: makeSelectCompaniesSearchDisabled('contributorInput'),
  disabledIssues: makeSelectCompaniesSearchDisabled('issueInput'),
  error: makeSelectCompaniesError('fetchCompany'),
  loading: makeSelectCompaniesLoading('fetchCompany'),
  search: makeSelectCompanies('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchContributors: payload => dispatch(searchContributors(payload)),
    handleSearchIssues: payload => dispatch(searchIssues(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailCompany);
