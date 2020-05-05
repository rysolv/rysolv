import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import UserCard from 'components/Users';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { clearAlerts, fetchUsers, inputChange, searchUsers } from '../actions';
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
export class UsersOverview extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Users Overview';
    const { dispatchFetchUsers } = this.props;
    dispatchFetchUsers();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      alerts,
      disabled,
      error,
      handleClearAlerts,
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
        component={UserCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          disabled,
          handleClearAlerts,
          handleInputChange,
          handleNav,
          handleSearchUsers,
          search,
        }}
      />
    );
  }
}

UsersOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  disabled: T.bool,
  dispatchFetchUsers: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
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
  users: makeSelectUsersFormatted('users'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchFetchUsers: () => dispatch(fetchUsers()),
    handleClearAlerts: () => dispatch(clearAlerts()),
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
