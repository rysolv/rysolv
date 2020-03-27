import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AsyncRender from 'components/AsyncRender';
import userCard from 'components/Users';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchUsers } from '../actions';
import {
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersLoading,
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
    const { users, error, loading } = this.props;
    return (
      <AsyncRender
        asyncData={users}
        component={userCard}
        error={error}
        loading={loading}
      />
    );
  }
}

Users.propTypes = {
  users: T.array,
  dispatchFetchUsers: T.func,
  error: T.oneOfType([T.object, T.bool]),
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  users: makeSelectUsers('users'),
  error: makeSelectUsersError('users'),
  loading: makeSelectUsersLoading('users'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchFetchUsers: () => dispatch(fetchUsers()),
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
