import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import RedirectComponent from 'components/Signin/Redirect';
import { resetRoute, signOut } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
  makeSelectAuthRoute,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { resetState } from './actions';
import reducer from './reducer';
import { makeSelectSignIn } from './selectors';
import {
  passwordResetComponent,
  signInDictionary,
  signUpDictionary,
} from './stepDictionary';

const Signin = ({
  activeUser,
  dispatchResetRoute,
  dispatchResetState,
  dispatchSignOut,
  handleNav,
  isSignedIn,
  isSignInRoute,
  isSignUpRoute,
  loading,
  match,
  step,
}) => {
  const [viewToRender, setViewToRender] = useState(null);
  useEffect(() => dispatchResetState, []);
  useEffect(() => {
    if (isSignInRoute) {
      setViewToRender(<Redirect to="/issues" />);
    } else if (isSignUpRoute) {
      dispatchResetRoute();
      setViewToRender(<Redirect to="/settings" />);
    } else {
      setViewToRender(
        <AsyncRender
          asyncData={activeUser}
          component={RedirectComponent}
          isRequiredData
          loading={loading}
          propsToPassDown={{
            dispatchSignOut,
            handleNav,
          }}
        />,
      );
    }
  }, [isSignedIn, loading]);
  const view = match.path.substr(1);
  const dictionaryToUse = {
    'password-reset': passwordResetComponent,
    signin: signInDictionary,
    signup: signUpDictionary,
  };
  const ComponentToRender =
    view === 'password-reset'
      ? dictionaryToUse[view]
      : dictionaryToUse[view][step];

  return (
    <ConditionalRender
      Component={ComponentToRender}
      FallbackComponent={viewToRender}
      shouldRender={!isSignedIn}
    />
  );
};

Signin.propTypes = {
  activeUser: T.object.isRequired,
  dispatchResetRoute: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSignOut: T.func.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  isSignInRoute: T.bool.isRequired,
  isSignUpRoute: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  isSignInRoute: makeSelectAuthRoute('signIn'),
  isSignUpRoute: makeSelectAuthRoute('signUp'),
  loading: makeSelectAuthLoading('auth'),
  /**
   * Reducer : Signin
   */
  step: makeSelectSignIn('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchResetRoute: () => dispatch(resetRoute()),
    dispatchSignOut: () => dispatch(signOut()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchResetState: () => dispatch(resetState()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(Signin);
