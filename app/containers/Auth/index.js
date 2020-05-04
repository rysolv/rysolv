import React from 'react';
import T from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { makeSelectActiveUser } from './selectors';
import { login } from './actions';
import { checkCookie } from './helpers';

export default function withAuth(config, Component) {
  const Auth = ({ isLoggedIn, handleLogin, ...restProps }) => {
    const { isPrivate } = config;

    if (!isLoggedIn) {
      const { userId } = checkCookie();
      if (userId) {
        handleLogin({ userId });
      } else if (!isLoggedIn && isPrivate) return <Redirect to="/signin" />;
    }

    return <Component {...restProps} />;
  };

  Auth.propTypes = {
    handleLogin: T.func,
    isLoggedIn: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    isLoggedIn: makeSelectActiveUser('isLoggedIn'),
  });

  const mapDispatchToProps = dispatch => ({
    /**
     * Auth
     */
    handleLogin: payload => dispatch(login(payload)),
  });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  const withReducer = injectReducer({ key: 'auth', reducer });
  const withSaga = injectSaga({ key: 'auth', saga });

  return withRouter(
    compose(
      withReducer,
      withSaga,
      withRouter,
      withConnect,
    )(Auth),
  );
}
