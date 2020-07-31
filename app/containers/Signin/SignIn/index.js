import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Signin from 'components/Signin/Signin';
import { clearAlerts, signIn } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import reducer from '../reducer';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

const SigninContainer = ({
  alerts: { error },
  data,
  data: { email, password },
  dispatchInputError,
  dispatchSignIn,
  handleClearAuthAlerts,
  handleInputChange,
  isSignedIn,
  signInDisabled,
  signInLoading,
}) => {
  const form = 'signIn';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sign In';
    return () => {
      handleClearAuthAlerts();
    };
  }, []);

  const handleSignIn = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: data,
    });
    if (isValidated) {
      dispatchSignIn({
        password: password.value,
        username: email.value,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form });
    }
  };

  const handleValidateInput = ({ field }) => {
    const validationError =
      validateOneField({ field, form, values: data }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form,
    });
  };
  return (
    <Signin
      data={data}
      error={error}
      handleClearAuthAlerts={handleClearAuthAlerts}
      handleInputChange={handleInputChange}
      handleSignIn={handleSignIn}
      handleValidateInput={handleValidateInput}
      isSignedIn={isSignedIn}
      loading={signInLoading}
      signInDisabled={signInDisabled}
    />
  );
};

SigninContainer.propTypes = {
  alerts: T.object,
  data: T.object,
  dispatchInputError: T.func,
  dispatchSignIn: T.func,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  isSignedIn: T.bool,
  signInDisabled: T.bool,
  signInLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  alerts: makeSelectAuth('alerts'),
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
    handleClearAuthAlerts: () => dispatch(clearAlerts()),
    /*
     * Reducer : Signin
     */
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
