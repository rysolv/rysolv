import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import RedirectComponent from 'components/Signin/Redirect';
import { signOut } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { resetState } from './actions';
import reducer from './reducer';
import { makeSelectSignIn } from './selectors';
import { signInDictionary, signUpDictionary } from './stepDictionary';

const Signin = ({
  activeUser,
  dispatchResetState,
  dispatchSignOut,
  handleNav,
  isSignedIn,
  loading,
  match,
  step,
}) => {
  const [viewToRender, setViewToRender] = useState(null);
  const { current: prevIsSignedIn } = useRef(isSignedIn);
  useEffect(() => dispatchResetState, []);
  useEffect(() => {
    if (isSignedIn !== prevIsSignedIn) {
      setViewToRender(<Redirect to="/issues" />);
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
  const dictionaryToUse =
    view === 'signin' ? signInDictionary : signUpDictionary;
  const ComponentToRender = dictionaryToUse[step];
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
  dispatchResetState: T.func.isRequired,
  dispatchSignOut: T.func.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
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
