import React, { useEffect } from 'react';
import T from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ConditionalRender, LoadingIndicator } from 'components/base_ui';

import { getCookie } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchActiveUser, fetchActiveUserFailure } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAuth, makeSelectAuthLoading } from './selectors';

export default function withAuth(config, Component) {
  const Auth = ({
    authenticateLoading,
    dispatchFetchActiveUser,
    dispatchFetchActiveUserFailure,
    isSignedIn,
    loading,
    ...restProps
  }) => {
    const { isPrivate } = config;

    useEffect(() => {
      const signedIn = getCookie('signedIn');
      if (!loading && signedIn) {
        dispatchFetchActiveUser();
      } else {
        dispatchFetchActiveUserFailure();
      }
    }, []);

    if (!authenticateLoading && isPrivate && !isSignedIn)
      return <Redirect to="/signin" />;

    return (
      <ConditionalRender
        Component={Component}
        FallbackComponent={LoadingIndicator}
        propsToPassDown={{ ...restProps }}
        shouldRender={!authenticateLoading}
      />
    );
  };

  Auth.propTypes = {
    authenticateLoading: T.bool,
    dispatchFetchActiveUser: T.func,
    dispatchFetchActiveUserFailure: T.func,
    isSignedIn: T.bool.isRequired,
    loading: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    authenticateLoading: makeSelectAuthLoading('authenticateUser'),
    isSignedIn: makeSelectAuth('isSignedIn'),
    loading: makeSelectAuthLoading('auth'),
  });

  const mapDispatchToProps = dispatch => ({
    /**
     * Auth
     */
    dispatchFetchActiveUser: () => dispatch(fetchActiveUser()),
    dispatchFetchActiveUserFailure: () => dispatch(fetchActiveUserFailure()),
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
      withConnect,
    )(Auth),
  );
}
