import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PaymentPortal from 'components/Payments';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  inputError,
  stripeToken,
  submitAccountPayment,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPayments } from './selectors';

const PaymentsContainer = ({
  alerts,
  balance,
  dispatchInputError,
  email,
  errors,
  firstName,
  fundedAmount,
  handleClearPaymentAlerts,
  handleNav,
  handleStripeToken,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
  lastName,
  open,
  organizationId,
  userId,
  ...restProps
}) => {
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
      organizationId={organizationId}
      userId={userId}
      {...restProps}
    />
  );
};

PaymentsContainer.propTypes = {
  alerts: T.object,
  balance: T.number,
  dispatchInputError: T.func,
  email: T.string,
  errors: T.object,
  firstName: T.string,
  fundedAmount: T.number,
  handleClearPaymentAlerts: T.func,
  handleNav: T.func,
  handleStripeToken: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  organizationId: T.string,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
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
  handleClearPaymentAlerts: () => dispatch(clearAlerts()),
  handleStripeToken: payload => dispatch(stripeToken(payload)),
  handleSubmitAccountPayment: payload =>
    dispatch(submitAccountPayment(payload)),
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
