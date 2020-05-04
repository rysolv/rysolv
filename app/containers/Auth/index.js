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

export default function withAuth(config, Component) {
  const Auth = ({ isLoggedIn, ...restProps }) => {
    const { isPrivate } = config;

    if (!isLoggedIn && isPrivate) return <Redirect to="/login" />;

    return <Component {...restProps} />;
  };

  Auth.propTypes = {
    isLoggedIn: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    isLoggedIn: makeSelectActiveUser('isLoggedIn'),
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
      withRouter,
      withConnect,
    )(Auth),
  );
}
