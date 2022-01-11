import React from 'react';
import T from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getCookie } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { LoadingIndicator } from 'components/base_ui';

import reducer from './reducer';
import saga from './saga';
import { makeSelectAuthLoading } from './selectors';

export default function withAuth(config, Component) {
  const Auth = ({ authenticateLoading, ...restProps }) => {
    const { isPrivate } = config;
    const { pathname } = window.location;
    const basePathname = pathname.split('/')[1];
    const isSignInPath = basePathname === 'signin' || basePathname === 'signup';
    const IsSignedIn = getCookie('signedIn');

    while (authenticateLoading) {
      return <LoadingIndicator />;
    }
    if (isPrivate && IsSignedIn && isSignInPath)
      return <Redirect to="/signin" />;
    if (isPrivate && !IsSignedIn) return <Redirect to="/signin" />;
    return <Component {...restProps} />;
  };

  Auth.propTypes = { authenticateLoading: T.bool.isRequired };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    authenticateLoading: makeSelectAuthLoading('authenticateUser'),
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
