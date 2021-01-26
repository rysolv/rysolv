import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import ResetPasswordSuccessView from 'components/Signin/PasswordReset/ResetPasswordSuccess';
import { clearAlerts } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { resetState } from '../actions';
import reducer from '../reducer';

const ResetPasswordSuccess = ({
  alerts: { success },
  dispatchResetState,
  handleClearAuthAlerts,
  handleNav,
}) => {
  useEffect(
    () => () => {
      dispatchResetState();
      handleClearAuthAlerts();
    },
    [],
  );
  const handleReturnToSignIn = () => {
    handleNav('/signin');
  };
  return (
    <ResetPasswordSuccessView
      handleReturnToSignIn={handleReturnToSignIn}
      success={success}
    />
  );
};

ResetPasswordSuccess.propTypes = {
  alerts: T.object.isRequired,
  dispatchResetState: T.func.isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleNav: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  alerts: makeSelectAuth('alerts'),
});

const mapDispatchToProps = dispatch => ({
  /**
   * Auth
   */
  handleClearAuthAlerts: () => dispatch(clearAlerts()),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
  /*
   * Reducer : Signin
   */
  dispatchResetState: () => dispatch(resetState()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(ResetPasswordSuccess);
