import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VerifyEmail from 'components/Signin/VerifyEmail';
import { clearAlerts, verifyEmail } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';
import reducer from '../reducer';

const VerifyContainer = ({
  activeUser,
  alerts: { error },
  dispatchInputError,
  dispatchVerifyEmail,
  handleClearAuthAlerts,
  handleInputChange,
  loading,
  signInData: { password: signInPassword },
  signUpData: { password: signUpPassword },
  verify,
  verifyDisabled,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      handleClearAuthAlerts();
    };
  }, []);

  const { email: userEmail, id: userId } = activeUser;
  const form = 'verify';
  const { verificationCode } = verify;
  const password = signInPassword.value || signUpPassword.value;

  const handleVerifyEmail = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: verify,
    });
    if (isValidated) {
      dispatchVerifyEmail({
        password,
        userEmail,
        userId,
        verificationCode,
      });
    } else {
      dispatchInputError({ errors: validationErrors, form });
    }
  };

  const handleValidateInput = ({ field }) => {
    const validationError =
      validateOneField({ field, form, values: verify }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form,
    });
  };
  return (
    <VerifyEmail
      activeUser={activeUser}
      error={error}
      handleClearAuthAlerts={handleClearAuthAlerts}
      handleInputChange={handleInputChange}
      handleValidateInput={handleValidateInput}
      handleVerifyEmail={handleVerifyEmail}
      loading={loading}
      verify={verify}
      verifyDisabled={verifyDisabled}
    />
  );
};

VerifyContainer.propTypes = {
  activeUser: T.object,
  alerts: T.object,
  dispatchInputError: T.func,
  dispatchVerifyEmail: T.func,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  loading: T.bool,
  signInData: T.object,
  signUpData: T.object,
  verify: T.object,
  verifyDisabled: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  alerts: makeSelectAuth('alerts'),
  loading: makeSelectAuthLoading('auth'),
  /*
   * Reducer : Signin
   */
  signInData: makeSelectSignIn('signIn'),
  signUpData: makeSelectSignIn('signUp'),
  verify: makeSelectSignIn('verify'),
  verifyDisabled: makeSelectDisabled('verify'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchVerifyEmail: payload => dispatch(verifyEmail(payload)),
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
)(VerifyContainer);
