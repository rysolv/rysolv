import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PaymentPortal from 'components/Payments';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  inputError,
  paypalPayment,
  resetState,
  stripeToken,
  submitAccountPayment,
} from './actions';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPayments } from './selectors';

const PaymentsContainer = ({
  activeUser,
  alerts,
  dispatchInputError,
  dispatchPaypalPayment,
  dispatchResetState,
  dispatchStripeToken,
  dispatchSubmitAccountPayment,
  errors,
  fundedAmount,
  handleClearPaymentAlerts,
  handleNav,
  isSignedIn,
  issueId,
  open,
  ...restProps
}) => {
  const { balance, email, firstName, id: userId, lastName } = activeUser;
  useEffect(() => dispatchResetState, []);

  const handleStripeToken = ({ amount, token, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchStripeToken({
        amount,
        issueId,
        token,
        userId,
      });
    } else {
      dispatchInputError({ errors: validationErrors });
    }
  };

  const handleSubmitAccountPayment = ({ fundValue, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchSubmitAccountPayment({
        fundValue,
        issueId,
        userId,
      });
    } else {
      dispatchInputError({ errors: validationErrors });
    }
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
    });
  };
  return (
    <PaymentPortal
      alerts={alerts}
      balance={balance}
      dispatchPaypalPayment={dispatchPaypalPayment}
      email={email}
      errors={errors}
      firstName={firstName}
      fundedAmount={fundedAmount}
      handleClearPaymentAlerts={handleClearPaymentAlerts}
      handleNav={handleNav}
      handleStripeToken={handleStripeToken}
      handleSubmitAccountPayment={handleSubmitAccountPayment}
      handleValidateInput={handleValidateInput}
      isSignedIn={isSignedIn}
      issueId={issueId}
      lastName={lastName}
      open={open}
      userId={userId}
      {...restProps}
    />
  );
};

PaymentsContainer.propTypes = {
  activeUser: T.object,
  alerts: T.object,
  dispatchInputError: T.func,
  dispatchPaypalPayment: T.func,
  dispatchResetState: T.func,
  dispatchStripeToken: T.func,
  dispatchSubmitAccountPayment: T.func,
  errors: T.object,
  fundedAmount: T.number,
  handleClearPaymentAlerts: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  open: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer: Payments
   */
  alerts: makeSelectPayments('alerts'),
  errors: makeSelectPayments('errors'),
});

const mapDispatchToProps = dispatch => ({
  /**
   * Reducer: Payments
   */
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchPaypalPayment: payload => dispatch(paypalPayment(payload)),
  dispatchResetState: () => dispatch(resetState()),
  dispatchStripeToken: payload => dispatch(stripeToken(payload)),
  dispatchSubmitAccountPayment: payload =>
    dispatch(submitAccountPayment(payload)),
  handleClearPaymentAlerts: () => dispatch(clearAlerts()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'payments', reducer });
const withSaga = injectSaga({ key: 'payments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PaymentsContainer);
