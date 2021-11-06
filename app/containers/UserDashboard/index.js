import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { dismissBanner, fetchUserDashboard, setHiringStatus } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUserDashboard,
  makeSelectUserDashboardView,
} from './selectors';
import viewDictionary from './viewDictionary';

const UserDashboard = ({
  deviceView,
  dispatchDismissBanner,
  dispatchFetchUserDashboard,
  dispatchSetHiringStatus,
  displayBanner,
  error,
  handleNav,
  isOverview,
  loading,
  user,
  view,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchUserDashboard();
  }, []);

  const ComponentToRender = viewDictionary(view);

  return (
    <AsyncRender
      asyncData={user}
      component={ComponentToRender}
      error={error}
      isRequiredData
      loading={loading}
      propsToPassDown={{
        deviceView,
        dismissBanner: dispatchDismissBanner,
        dispatchSetHiringStatus,
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
  dispatchSetHiringStatus: T.func.isRequired,
  displayBanner: T.bool.isRequired,
  error: T.string,
  handleNav: T.func.isRequired,
  isOverview: T.bool,
  loading: T.bool.isRequired,
  user: T.object.isRequired,
  view: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : user
   */
  displayBanner: makeSelectUserDashboard('displayBanner'),
  error: makeSelectUserDashboard('error'),
  loading: makeSelectUserDashboard('loading'),
  user: makeSelectUserDashboard('user'),
  view: makeSelectUserDashboardView(),
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
    dispatchSetHiringStatus: payload => dispatch(setHiringStatus(payload)),
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
