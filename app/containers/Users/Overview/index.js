import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AsyncRender from 'components/AsyncRender';
import UserCard from 'components/Users';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectViewSize from 'containers/ViewSize/selectors';

import { fetchUsers, resetState, searchUsers } from '../actions';
import {
  makeSelectUsersError,
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

const UsersOverview = ({
  deviceView,
  dispatchFetchUsers,
  dispatchResetState,
  error,
  handleSearchUsers,
  loading,
  match,
  users,
}) => {
  const {
    params: { searchValue },
  } = match;
  useEffect(() => dispatchResetState, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Users';
    if (searchValue) {
      handleSearchUsers({ value: searchValue });
    } else {
      dispatchFetchUsers();
    }
  }, [searchValue]);
  return (
    <AsyncRender
      asyncData={users}
      component={UserCard}
      error={error}
      loading={loading}
      propsToPassDown={{
        deviceView,
      }}
    />
  );
};

UsersOverview.propTypes = {
  deviceView: T.string,
  dispatchFetchUsers: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  handleSearchUsers: T.func,
  loading: T.bool,
  match: T.object.isRequired,
  users: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  error: makeSelectUsersError('users'),
  loading: makeSelectUsersLoading('users'),
  users: makeSelectUsersFormatted('users'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchFetchUsers: () => dispatch(fetchUsers()),
    dispatchResetState: () => dispatch(resetState()),
    handleSearchUsers: payload => dispatch(searchUsers(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UsersOverview);
