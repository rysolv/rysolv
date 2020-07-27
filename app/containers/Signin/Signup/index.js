import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import RedirectComponent from 'components/Signin/Redirect';
import {
  clearAlerts,
  clearState,
  signOut,
  signUp,
  verifyEmail,
} from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthError,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { clearForm, incrementStep, inputChange, inputError } from '../actions';
import {
  makeSelectDisabled,
  makeSelectSignIn,
  makeSelectVerifyDisabled,
} from '../selectors';
import reducer from '../reducer';
import { signUpDictionary } from '../stepDictionary';

// eslint-disable-next-line react/prefer-stateless-function
const SignUpContainer = ({
  activeUser,
  activeUserLoading,
  data,
  dispatchClearAuthState,
  dispatchClearForm,
  dispatchIncrementStep,
  dispatchInputError,
  dispatchSignout,
  dispatchSignUp,
  dispatchVerifyEmail,
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleNav,
  isSignedIn,
  signUpDisabled,
  signUpLoading,
  step,
  verificationSent,
  verify,
  verifyDisabled,
  verifyEmailLoading,
}) => {
  const [viewToRender, setViewToRender] = useState(null);
  const { current: prevIsSignedIn } = useRef(isSignedIn);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Create Account';
    return () => {
      dispatchClearAuthState({ state: 'verificationSent' });
      dispatchClearForm();
    };
  }, []);

  if (verificationSent) {
    dispatchIncrementStep({ step: 2 });
  }

  const StepToRender = signUpDictionary[step];
  const { email: userEmail, id: userId } = activeUser;
  const {
    email,
    firstName,
    lastName,
    password,
    username,
    verifyPassword,
  } = data;
  const { verificationCode } = verify;

  const handleSignUp = () => {
    if (password.value === verifyPassword.value) {
      dispatchSignUp({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        username: username.value,
      });
    }
  };

  const handleVerifyEmail = () => {
    dispatchVerifyEmail({
      password: password.value,
      userEmail,
      userId,
      verificationCode,
    });
  };

  const handleVerifyPassword = () => {
    if (password.value !== verifyPassword.value) {
      dispatchInputError({
        errors: {
          verifyPassword: 'Passwords do not match.',
        },
        form: 'signUp',
      });
    }
  };

  return (
    <ConditionalRender
      Component={StepToRender}
      FallbackComponent={viewToRender}
      shouldRender={!isSignedIn}
      propsToPassDown={{
        activeUser,
        data,
        error,
        handleClearAuthAlerts,
        handleInputChange,
        handleSignUp,
        handleVerifyEmail,
        handleVerifyPassword,
        isSignedIn,
        signUpDisabled,
        signUpLoading,
        verify,
        verifyDisabled,
        verifyEmailLoading,
      }}
    />
  );
};

SignUpContainer.propTypes = {
  activeUser: T.object,
  activeUserLoading: T.bool,
  data: T.object,
  dispatchClearAuthState: T.func,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchInputError: T.func,
  dispatchSignout: T.func,
  dispatchSignUp: T.func,
  dispatchVerifyEmail: T.func,
  error: T.object,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
  signUpDisabled: T.bool,
  signUpLoading: T.bool,
  step: T.number,
  verificationSent: T.bool,
  verify: T.object,
  verifyDisabled: T.bool,
  verifyEmailLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  activeUserLoading: makeSelectAuthLoading('fetchActiveUser'),
  error: makeSelectAuthError('signUp'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  signUpLoading: makeSelectAuthLoading('signUp'),
  verificationSent: makeSelectAuth('verificationSent'),
  verifyEmailLoading: makeSelectAuthLoading('verifyEmail'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signUp'),
  signUpDisabled: makeSelectDisabled('signUp'),
  step: makeSelectSignIn('step'),
  verify: makeSelectSignIn('verify'),
  verifyDisabled: makeSelectVerifyDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchClearAuthState: payload => dispatch(clearState(payload)),
    dispatchSignout: () => dispatch(signOut()),
    dispatchSignUp: payload => dispatch(signUp(payload)),
    handleClearAuthAlerts: () => dispatch(clearAlerts()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchVerifyEmail: payload => dispatch(verifyEmail(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
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
)(SignUpContainer);
