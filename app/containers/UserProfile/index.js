import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import UserProfileComponent from 'components/UserProfile';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchUserProfile } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUserProfile,
  makeSelectUserProfileParams,
} from './selectors';

const UserProfile = ({
  deviceView,
  dispatchFetchUserProfile,
  error,
  isOverview,
  loading,
  params,
  user,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchFetchUserProfile({ username: params });
  }, []);

  useEffect(() => {
    document.title = user.username;
  }, [user]);

  return (
    <AsyncRender
      asyncData={user}
      component={UserProfileComponent}
      error={error}
      isRequiredData
      loading={loading}
      propsToPassDown={{ deviceView, isOverview }}
    />
  );
};

UserProfile.defaultProps = { isOverview: false };

UserProfile.propTypes = {
  deviceView: T.string.isRequired,
  dispatchFetchUserProfile: T.func.isRequired,
  error: T.string,
  isOverview: T.bool,
  loading: T.bool.isRequired,
  params: T.string.isRequired,
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : UserProfile
   */
  error: makeSelectUserProfile('error'),
  loading: makeSelectUserProfile('loading'),
  params: makeSelectUserProfileParams(),
  user: makeSelectUserProfile('user'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : User Profile
     */
    dispatchFetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserProfile);
