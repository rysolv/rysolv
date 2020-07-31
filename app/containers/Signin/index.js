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

import { clearForm } from './actions';
import reducer from './reducer';
import { makeSelectSignIn } from './selectors';
import { signInDictionary, signUpDictionary } from './stepDictionary';

// eslint-disable-next-line react/prefer-stateless-function
const Signin = ({
  activeUser,
  activeUserLoading,
  dispatchClearForm,
  dispatchSignout,
  handleNav,
  isSignedIn,
  match,
  step,
}) => {
  const [viewToRender, setViewToRender] = useState(null);
  const { current: prevIsSignedIn } = useRef(isSignedIn);
  useEffect(
    () => () => {
      dispatchClearForm();
    },
    [],
  );
  useEffect(() => {
    if (isSignedIn !== prevIsSignedIn) {
      setViewToRender(<Redirect to="/issues" />);
    } else {
      setViewToRender(
        <AsyncRender
          asyncData={activeUser}
          component={RedirectComponent}
          isRequiredData
          loading={activeUserLoading}
          propsToPassDown={{
            dispatchSignout,
            handleNav,
          }}
        />,
      );
    }
  }, [activeUserLoading, isSignedIn]);
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
  activeUserLoading: T.bool.isRequired,
  dispatchClearForm: T.func.isRequired,
  dispatchSignout: T.func.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  match: T.object.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  activeUserLoading: makeSelectAuthLoading('fetchActiveUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
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
    dispatchSignout: () => dispatch(signOut()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
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
