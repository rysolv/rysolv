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
import { signin } from './actions';
import { checkCookie } from './helpers';

export default function withAuth(config, Component) {
  const Auth = ({ isSignedIn, handleSignin, ...restProps }) => {
    const { isPrivate } = config;

    if (!isSignedIn) {
      const { userId } = checkCookie();
      if (userId) {
        handleSignin({ userId });
      } else if (!isSignedIn && isPrivate) return <Redirect to="/signin" />;
    }

    return <Component {...restProps} />;
  };

  Auth.propTypes = {
    handleSignin: T.func,
    isSignedIn: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    isSignedIn: makeSelectActiveUser('isSignedIn'),
  });

  const mapDispatchToProps = dispatch => ({
    /**
     * Auth
     */
    handleSignin: payload => dispatch(signin(payload)),
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
