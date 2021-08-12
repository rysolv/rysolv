import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Signup from 'components/Signin/Signup';
import { clearAlerts, signUp } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';
import reducer from '../reducer';

const SignUpContainer = ({
  alerts: { error },
  data,
  dispatchInputError,
  dispatchSignUp,
  handleClearAuthAlerts,
  handleInputChange,
  loading,
  signUpDisabled,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sign Up';
  }, []);

  const { email, firstName, lastName, password, username } = data;
  const form = 'signUp';

  const handleSignUp = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: data,
      verifyField: { field: 'password', verifyValue: password.value },
    });
    if (isValidated) {
      dispatchSignUp({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        username: username.value,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form });
    }
  };

  const handleValidateInput = ({ field, verifyField }) => {
    const validationError =
      validateOneField({ field, form, values: data, verifyField }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form,
    });
  };
  return (
    <Signup
      data={data}
      error={error}
      handleClearAuthAlerts={handleClearAuthAlerts}
      handleInputChange={handleInputChange}
      handleSignUp={handleSignUp}
      handleValidateInput={handleValidateInput}
      loading={loading}
      signUpDisabled={signUpDisabled}
    />
  );
};

SignUpContainer.propTypes = {
  alerts: T.object,
  data: T.object,
  dispatchInputError: T.func,
  dispatchSignUp: T.func,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  loading: T.bool,
  signUpDisabled: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  alerts: makeSelectAuth('alerts'),
  loading: makeSelectAuthLoading('auth'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signUp'),
  signUpDisabled: makeSelectDisabled('signUp'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignUp: payload => dispatch(signUp(payload)),
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
)(SignUpContainer);
