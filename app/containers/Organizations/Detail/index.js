import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import OrganizationDetailView from 'components/Organizations/Detail/OrganizationDetailView';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchInfo, inputChange, upvoteIssue } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFormattedData,
  makeSelectOrganizationsLoading,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class OrganizationsDetail extends React.PureComponent {
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
    );
  }
}

OrganizationsDetail.propTypes = {
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
)(OrganizationsDetail);
