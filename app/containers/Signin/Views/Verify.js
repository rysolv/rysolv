import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VerifyEmail from 'components/Signin/VerifyEmail';
import { clearAlerts, resendCode, verifyEmail } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

const VerifyView = ({
  activeUser,
  alerts: { error, success },
  dispatchInputError,
  dispatchVerifyEmail,
  handleClearAuthAlerts,
  handleInputChange,
  handleResendCode,
  loading,
  verify,
  verifyDisabled,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { email: userEmail, id: userId } = activeUser;
  const form = 'verify';
  const { verificationCode } = verify;

  const handleVerifyEmail = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: verify,
    });
    if (isValidated) {
      dispatchVerifyEmail({
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
      handleResendCode={handleResendCode}
      handleValidateInput={handleValidateInput}
      handleVerifyEmail={handleVerifyEmail}
      loading={loading}
      success={success}
      verify={verify}
      verifyDisabled={verifyDisabled}
    />
  );
};

VerifyView.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchVerifyEmail: T.func.isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleResendCode: T.func.isRequired,
  loading: T.bool.isRequired,
  verify: T.object.isRequired,
  verifyDisabled: T.bool.isRequired,
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
    handleResendCode: payload => dispatch(resendCode(payload)),
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

export default compose(withConnect)(VerifyView);
