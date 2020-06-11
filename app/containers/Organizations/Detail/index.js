import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import OrganizationDetailView from 'components/Organizations/Detail/OrganizationDetailView';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { openModalState } from 'containers/Main/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchInfo,
  inputChange,
  updateInfo,
  upvoteIssue,
} from '../actions';
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

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      activeUser,
      alerts,
      data,
      dispatchEditOrganization,
      dispatchOpenModal,
      error,
      filterValues,
      handleClearAlerts,
      handleInputChange,
      handleNav,
      handleUpvote,
      isSignedIn,
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
          activeUser,
          alerts,
          dispatchEditOrganization,
          dispatchOpenModal,
          filterValues,
          handleClearAlerts,
          handleInputChange,
          handleNav,
          handleUpvote,
          isSignedIn,
        }}
      />
    );
  }
}

OrganizationsDetail.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  data: T.object,
  dispatchEditOrganization: T.func.isRequired,
  dispatchFetchInfo: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectOrganizations('alerts'),
  data: makeSelectOrganizationsFormattedData(),
  error: makeSelectOrganizationsError('fetchOrganization'),
  filterValues: makeSelectOrganizations('filter'),
  loading: makeSelectOrganizationsLoading('fetchOrganization'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
    /*
     * Reducer : Main
     */
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    /**
     * Reducer : Organizations
     */
    dispatchEditOrganization: payload => dispatch(updateInfo(payload)),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
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
