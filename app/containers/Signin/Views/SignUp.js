import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import Signup from 'components/Signin/Signup';
import { clearAlerts, signUp } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

const SignUpView = ({
  alerts: { error },
  data,
  dispatchInputError,
  dispatchSignUp,
  handleClearAuthAlerts,
  handleInputChange,
  handleNav,
  loading,
  signUpDisabled,
}) => {
  const { email, firstName, lastName, password, username } = data;
  const form = 'signUp';

  const handleSignUp = ({ selected }) => {
    const isCompany = selected === 'company';
    const { isValidated, validationErrors } = validateFields({
      form,
      values: data,
      verifyField: { field: 'password', verifyValue: password.value },
    });
    if (isValidated) {
      dispatchSignUp({
        email: email.value,
        firstName: firstName.value,
        isCompany,
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
      handleNav={handleNav}
      handleSignUp={handleSignUp}
      handleValidateInput={handleValidateInput}
      loading={loading}
      signUpDisabled={signUpDisabled}
    />
  );
};

SignUpView.propTypes = {
  alerts: T.object,
  data: T.object,
  dispatchInputError: T.func,
  dispatchSignUp: T.func,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
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
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
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

export default compose(withConnect)(SignUpView);
