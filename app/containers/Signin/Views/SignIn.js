import React from 'react';
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

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

const SignInView = ({
  alerts: { error },
  data,
  data: { email, password },
  dispatchInputError,
  dispatchSignIn,
  handleClearAuthAlerts,
  handleInputChange,
  loading,
  signInDisabled,
}) => {
  const form = 'signIn';

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
      loading={loading}
      signInDisabled={signInDisabled}
    />
  );
};

SignInView.propTypes = {
  alerts: T.object.isRequired,
  data: T.object.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchSignIn: T.func.isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  loading: T.bool.isRequired,
  signInDisabled: T.bool.isRequired,
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

export default compose(withConnect)(SignInView);
