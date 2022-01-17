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

import reducer from '../reducer';

const ResetPasswordSuccess = ({
  alerts: { success },
  handleClearAuthAlerts,
  handleNav,
}) => {
  useEffect(
    () => () => {
      handleClearAuthAlerts();
    },
    [],
  );

  return (
    <ResetPasswordSuccessView
      handleReturnToSignIn={() => handleNav('/signin')}
      success={success}
    />
  );
};

ResetPasswordSuccess.propTypes = {
  alerts: T.object.isRequired,
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
