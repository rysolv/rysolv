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
    amountFunded="50"
    form={{
      name: { error: '', value: '' },
      email: { error: '', value: '' },
    }}
    dispatchVerifyRecaptcha={dispatchVerifyRecaptcha}
    dispatchVerifyRecaptchFailure={dispatchVerifyRecaptchFailure}
    isFunded
    handleInputChange={() => {}}
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
