import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ResetPasswordView from 'components/Signin/PasswordReset/ResetPassword';
import { resetPassword } from 'containers/Auth/actions';
import { makeSelectAuthLoading } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { incrementResetStep, inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';
import reducer from '../reducer';

const ResetPassword = ({
  data,
  data: { password, verificationCode },
  dispatchIncrementResetStep,
  dispatchInputError,
  dispatchResetPassword,
  handleInputChange,
  loading,
  resetPasswordDisabled,
  sendLinkData: { email },
}) => {
  const form = 'resetPassword';

  const handleResetPassword = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: data,
      verifyField: { field: 'password', verifyValue: password.value },
    });
    if (isValidated) {
      dispatchResetPassword({
        email: email.value,
        password: password.value,
        verificationCode: verificationCode.value,
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
    <ResetPasswordView
      data={data}
      dispatchIncrementResetStep={dispatchIncrementResetStep}
      handleInputChange={handleInputChange}
      handleResetPassword={handleResetPassword}
      handleValidateInput={handleValidateInput}
      loading={loading}
      resetPasswordDisabled={resetPasswordDisabled}
    />
  );
};

ResetPassword.propTypes = {
  data: T.object.isRequired,
  dispatchIncrementResetStep: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetPassword: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  loading: T.bool.isRequired,
  resetPasswordDisabled: T.bool.isRequired,
  sendLinkData: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  loading: makeSelectAuthLoading('auth'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('resetPassword'),
  resetPasswordDisabled: makeSelectDisabled('resetPassword'),
  sendLinkData: makeSelectSignIn('sendLink'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Auth
   */
  dispatchResetPassword: payload => dispatch(resetPassword(payload)),
  /*
   * Reducer : Signin
   */
  dispatchIncrementResetStep: payload => dispatch(incrementResetStep(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  handleInputChange: payload => dispatch(inputChange(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(ResetPassword);
