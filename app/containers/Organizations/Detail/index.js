import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import CompanyDetailView from 'components/Organizations/Detail/CompanyDetailView';
import { upvoteIssue } from 'containers/Issues/actions';

import { fetchInfo, inputChange } from '../actions';
import {
  makeSelectCompanies,
  makeSelectCompaniesError,
  makeSelectCompaniesFormattedData,
  makeSelectCompaniesLoading,
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
      error,
      filterValues,
      handleInputChange,
      handleNav,
      handleUpvote,
      loading,
    } = this.props;

    return (
      <DetailWrapper>
        <AsyncRender
          asyncData={data}
          component={CompanyDetailView}
          error={error}
          isRequiredData
          loading={loading}
          propsToPassDown={{
            filterValues,
            handleInputChange,
            handleNav,
            handleUpvote,
          }}
        />
      </DetailWrapper>
    );
  }
}

DetailCompany.propTypes = {
  data: T.object,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  data: makeSelectCompaniesFormattedData(),
  error: makeSelectCompaniesError('fetchCompany'),
  filterValues: makeSelectCompanies('filter'),
  loading: makeSelectCompaniesLoading('fetchCompany'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    /**
     * Reducer : Issues
     */
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
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
