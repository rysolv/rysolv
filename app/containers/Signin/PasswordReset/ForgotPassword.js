import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ForgotPasswordView from 'components/Signin/PasswordReset/ForgotPassword';
import { clearAlerts, sendLink } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import reducer from '../reducer';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

const ForgotPassword = ({
  alerts: { error },
  data,
  data: { email },
  dispatchInputError,
  dispatchSendLink,
  handleClearAuthAlerts,
  handleInputChange,
  loading,
  sendLinkDisabled,
}) => {
  const form = 'sendLink';

  const handleSendLink = () => {
    const { isValidated, validationErrors } = validateFields({
      form,
      values: data,
    });
    if (isValidated) {
      dispatchSendLink({
        email: email.value,
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
    <ForgotPasswordView
      data={data}
      error={error}
      handleClearAuthAlerts={handleClearAuthAlerts}
      handleInputChange={handleInputChange}
      handleSendLink={handleSendLink}
      handleValidateInput={handleValidateInput}
      loading={loading}
      sendLinkDisabled={sendLinkDisabled}
    />
  );
};

ForgotPassword.propTypes = {
  alerts: T.object.isRequired,
  data: T.object.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchSendLink: T.func.isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  loading: T.bool.isRequired,
  sendLinkDisabled: T.bool.isRequired,
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
  data: makeSelectSignIn('sendLink'),
  sendLinkDisabled: makeSelectDisabled('sendLink'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSendLink: payload => dispatch(sendLink(payload)),
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
)(ForgotPassword);
