import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PaymentPortal from 'components/Payments';
import PaymentPortalModal from 'components/PaymentsModal';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  incrementStep,
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
  handleClearPaymentAlerts,
  handleIncrement,
  isModal,
  issueId,
  step,
  ...restProps
}) => {
  const { balance, email, firstName, lastName } = activeUser;
  useEffect(() => dispatchResetState, []);

  const ComponentToRender = isModal ? PaymentPortalModal : PaymentPortal;

  const handleStripeToken = ({ amount, token, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchStripeToken({
        amount,
        issueId,
        token,
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
    <ComponentToRender
      alerts={alerts}
      balance={balance}
      dispatchPaypalPayment={dispatchPaypalPayment}
      email={email}
      errors={errors}
      firstName={firstName}
      handleClearPaymentAlerts={handleClearPaymentAlerts}
      handleIncrement={handleIncrement}
      handleStripeToken={handleStripeToken}
      handleSubmitAccountPayment={handleSubmitAccountPayment}
      handleValidateInput={handleValidateInput}
      issueId={issueId}
      lastName={lastName}
      step={step}
      {...restProps}
    />
  );
};

PaymentsContainer.defaultProps = { isModal: false };

PaymentsContainer.propTypes = {
  activeUser: T.object,
  alerts: T.object,
  dispatchInputError: T.func,
  dispatchPaypalPayment: T.func,
  dispatchResetState: T.func,
  dispatchStripeToken: T.func,
  dispatchSubmitAccountPayment: T.func,
  errors: T.object,
  handleClearPaymentAlerts: T.func,
  handleIncrement: T.func.isRequired,
  isModal: T.bool,
  issueId: T.string,
  step: T.number.isRequired,
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
  step: makeSelectPayments('step'),
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
  handleIncrement: payload => dispatch(incrementStep(payload)),
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
