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
import { makeSelectAuth } from './selectors';
import { signIn, signUp } from './actions';

export default function withAuth(config, Component) {
  const Auth = ({ isSignedIn, handleSignIn, handleSignUp, ...restProps }) => {
    const { isPrivate } = config;
    if (!isSignedIn && isPrivate) return <Redirect to="/signin" />;

    // if (!isSignedIn) {
    //   const { userId } = checkCookie();
    //   if (userId) {
    //     handleSignIn({ userId });
    //   } else if (!isSignedIn && isPrivate) return <Redirect to="/signin" />;
    // }

    return <Component {...restProps} />;
  };

  Auth.propTypes = {
    handleSignIn: T.func,
    handleSignUp: T.func,
    isSignedIn: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    isSignedIn: makeSelectAuth('isSignedIn'),
  });

  const mapDispatchToProps = dispatch => ({
    /**
     * Auth
     */
    handleSignIn: payload => dispatch(signIn(payload)),
    handleSignUp: payload => dispatch(signUp(payload)),
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
