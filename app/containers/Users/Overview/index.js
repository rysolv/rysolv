import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import UserCard from 'components/Users';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectViewSize from 'containers/ViewSize/selectors';

import { fetchUsers, inputChange, searchUsers } from '../actions';
import {
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

// eslint-disable-next-line react/prefer-stateless-function
const UsersOverview = ({
  deviceView,
  disabled,
  dispatchFetchUsers,
  error,
  handleInputChange,
  handleNav,
  handleSearchUsers,
  loading,
  params: { searchValue },
  search,
  users,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Users Overview';
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
        disabled,
        handleInputChange,
        handleNav,
        handleSearchUsers,
        search,
      }}
    />
  );
};

UsersOverview.propTypes = {
  deviceView: T.string,
  disabled: T.bool,
  dispatchFetchUsers: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchUsers: T.func,
  loading: T.bool,
  params: T.object,
  search: T.object,
  users: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  disabled: makeSelectUsersSearchDisabled(),
  error: makeSelectUsersError('users'),
  loading: makeSelectUsersLoading('users'),
  search: makeSelectUsers('search'),
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
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchUsers: payload => dispatch(searchUsers(payload)),
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
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UsersOverview);
