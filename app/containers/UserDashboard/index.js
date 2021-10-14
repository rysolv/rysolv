import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import UserDashboardView from 'components/UserDashboard';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { dismissBanner, fetchUserDashboard } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUserDashboard } from './selectors';

const UserDashboard = ({
  deviceView,
  dispatchDismissBanner,
  dispatchFetchUserDashboard,
  displayBanner,
  error,
  handleNav,
  isOverview,
  loading,
  user,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchUserDashboard();
  }, []);
  return (
    <AsyncRender
      asyncData={user}
      component={UserDashboardView}
      error={error}
      isRequiredData
      loading={loading}
      propsToPassDown={{
        deviceView,
        dismissBanner: dispatchDismissBanner,
        displayBanner,
        handleNav,
        isOverview,
      }}
    />
  );
};

UserDashboard.defaultProps = { isOverview: false };

UserDashboard.propTypes = {
  deviceView: T.string.isRequired,
  dispatchDismissBanner: T.func.isRequired,
  dispatchFetchUserDashboard: T.func.isRequired,
  displayBanner: T.bool.isRequired,
  error: T.string,
  handleNav: T.func.isRequired,
  isOverview: T.bool,
  loading: T.bool.isRequired,
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : user
   */
  displayBanner: makeSelectUserDashboard('displayBanner'),
  error: makeSelectUserDashboard('error'),
  loading: makeSelectUserDashboard('loading'),
  user: makeSelectUserDashboard('user'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : User Dashboard
     */
    dispatchDismissBanner: () => dispatch(dismissBanner()),
    dispatchFetchUserDashboard: () => dispatch(fetchUserDashboard()),
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
