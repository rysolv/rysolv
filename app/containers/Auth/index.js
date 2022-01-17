import React from 'react';
import T from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { LoadingIndicator } from 'components/base_ui';

import reducer from './reducer';
import saga from './saga';
import { makeSelectAuth, makeSelectAuthLoading } from './selectors';

export default function withAuth(config, Component) {
  const Auth = ({ authenticateLoading, isSignedIn, ...restProps }) => {
    const { isPrivate } = config;
    const { pathname } = window.location;
    const basePathname = pathname.split('/')[1];
    const isSignInPath = basePathname === 'signin' || basePathname === 'signup';

    while (authenticateLoading) {
      return <LoadingIndicator />;
    }
    if (isPrivate && isSignedIn && isSignInPath) {
      return <Redirect to="/signin" />;
    }
    if (isPrivate && !isSignedIn) {
      return <Redirect to="/signin" />;
    }
    return <Component {...restProps} />;
  };

  Auth.propTypes = {
    authenticateLoading: T.bool.isRequired,
    isSignedIn: T.bool.isRequired,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    authenticateLoading: makeSelectAuthLoading('authenticateUser'),
    isSignedIn: makeSelectAuth('isSignedIn'),
  });

  const withConnect = connect(
    mapStateToProps,
    null,
  );

  const withReducer = injectReducer({ key: 'auth', reducer });
  const withSaga = injectSaga({ key: 'auth', saga });

  return withRouter(
    compose(
      withReducer,
      withSaga,
      withConnect,
    )(Auth),
  );
}
