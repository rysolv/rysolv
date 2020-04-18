import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import PaymentPortal from 'components/Payments';

import { verifyRecaptcha, verifyRecaptchaFailure } from './actions';

const PaymentsContainer = ({
  dispatchVerifyRecaptcha,
  dispatchVerifyRecaptchFailure,
}) => (
  <PaymentPortal
    dispatchVerifyRecaptcha={dispatchVerifyRecaptcha}
    dispatchVerifyRecaptchFailure={dispatchVerifyRecaptchFailure}
  />
);

PaymentsContainer.propTypes = {
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchFailure: T.func,
};

const mapDispatchToProps = dispatch => ({
  /**
   * Reducer: PaymentsContainer
   */
  dispatchVerifyRecaptcha: payload => dispatch(verifyRecaptcha(payload)),
  dispatchVerifyRecaptchFailure: () => dispatch(verifyRecaptchaFailure()),
});

export default connect(
  null,
  mapDispatchToProps,
)(PaymentsContainer);
