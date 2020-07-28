/* eslint-disable react/no-did-update-set-state */
import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import Signin from 'components/Signin/Signin';
import RedirectComponent from 'components/Signin/Redirect';
import { clearAlerts, signIn, signOut } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthError,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { clearForm, inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import reducer from '../reducer';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
const SigninContainer = ({
  activeUser,
  activeUserLoading,
  data,
  data: { email, password },
  dispatchClearForm,
  dispatchInputError,
  dispatchSignIn,
  dispatchSignout,
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleNav,
  isSignedIn,
  signInDisabled,
  signInLoading,
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
    document.title = 'Sign In';
    return () => {
      dispatchClearForm();
      handleClearAuthAlerts();
    };
  }, []);

  const handleSignIn = () => {
    const { isValidated, validationErrors } = validateFields({
      values: data,
    });
    if (isValidated) {
      dispatchSignIn({
        password: password.value,
        username: email.value,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'signIn' });
    }
  };

  const handleValidateInput = ({ field }) => {
    const validationError = validateOneField({ field, values: data }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'signIn',
    });
  };
  return (
    <ConditionalRender
      Component={Signin}
      FallbackComponent={viewToRender}
      propsToPassDown={{
        data,
        error,
        handleClearAuthAlerts,
        handleInputChange,
        handleSignIn,
        handleValidateInput,
        isSignedIn,
        signInDisabled,
        signInLoading,
      }}
      shouldRender={!isSignedIn}
    />
  );
};

SigninContainer.propTypes = {
  activeUser: T.object,
  activeUserLoading: T.bool,
  data: T.object,
  dispatchClearForm: T.func,
  dispatchInputError: T.func,
  dispatchSignIn: T.func,
  dispatchSignout: T.func,
  error: T.object,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
  signInDisabled: T.bool,
  signInLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  activeUserLoading: makeSelectAuthLoading('fetchActiveUser'),
  error: makeSelectAuthError('signIn'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  signInLoading: makeSelectAuthLoading('signIn'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signIn'),
  signInDisabled: makeSelectDisabled('signIn'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignIn: payload => dispatch(signIn(payload)),
    dispatchSignout: () => dispatch(signOut()),
    handleClearAuthAlerts: () => dispatch(clearAlerts()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchInputError: payload => dispatch(inputError(payload)),
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
)(SigninContainer);
