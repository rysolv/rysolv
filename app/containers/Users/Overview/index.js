import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import userCard from 'components/Users';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  deleteUser,
  fetchInfo,
  fetchUsers,
  inputChange,
  searchUsers,
} from '../actions';
import {
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Users extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchUsers } = this.props;
    dispatchFetchUsers();
  }

  render() {
    const {
      alerts,
      disabled,
      dispatchFetchInfo,
      error,
      handleClearAlerts,
      handleDeleteUser,
      handleInputChange,
      handleNav,
      handleSearchUsers,
      loading,
      search,
      users,
    } = this.props;
    return (
      <AsyncRender
        asyncData={users}
        component={userCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          disabled,
          handleClearAlerts,
          handleDeleteUser,
          handleFetchInfo: dispatchFetchInfo,
          handleInputChange,
          handleNav,
          handleSearchUsers,
          search,
        }}
      />
    );
  }
}

Users.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  disabled: T.bool,
  dispatchFetchInfo: T.func,
  dispatchFetchUsers: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleDeleteUser: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchUsers: T.func,
  loading: T.bool,
  search: T.object,
  users: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  alerts: makeSelectUsers('alerts'),
  disabled: makeSelectUsersSearchDisabled(),
  error: makeSelectUsersError('users'),
  loading: makeSelectUsersLoading('users'),
  search: makeSelectUsers('search'),
  users: makeSelectUsers('users'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchFetchUsers: () => dispatch(fetchUsers()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDeleteUser: payload => dispatch(deleteUser(payload)),
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
)(Users);
