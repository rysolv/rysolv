import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import OrganizationDetailView from 'components/Organizations/Detail/OrganizationDetailView';
import { upvoteIssue } from 'containers/Issues/actions';

import { fetchInfo, inputChange } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFormattedData,
  makeSelectOrganizationsLoading,
} from '../selectors';
import { DetailWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class DetailOrganization extends React.PureComponent {
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
          component={OrganizationDetailView}
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

DetailOrganization.propTypes = {
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
  data: makeSelectOrganizationsFormattedData(),
  error: makeSelectOrganizationsError('fetchOrganization'),
  filterValues: makeSelectOrganizations('filter'),
  loading: makeSelectOrganizationsLoading('fetchOrganization'),
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
)(DetailOrganization);
