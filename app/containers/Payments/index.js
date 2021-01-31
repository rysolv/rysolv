import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
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
import { PaymentContainer } from './styledComponents';

const PaymentsContainer = ({
  activeUser,
  alerts,
  awardedUser,
  dispatchInputError,
  dispatchPaypalPayment,
  dispatchResetState,
  dispatchStripeToken,
  dispatchSubmitAccountPayment,
  errors,
  handleClearPaymentAlerts,
  handleIncrement,
  isInFundingQueue,
  isModal,
  isPullRequestMerged,
  issueId,
  loading,
  open,
  rep,
  step,
  ...restProps
}) => {
  const { balance, email: userEmail } = activeUser;
  useEffect(() => dispatchResetState, []);

  const ComponentToRender = isModal ? PaymentPortalModal : PaymentPortal;

  const handleStripeToken = ({ amount, email, token, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchStripeToken({
        amount,
        email,
        issueId,
        token,
      });
    } else {
      dispatchInputError({ errors: validationErrors });
    }
  };

  const handleSubmitAccountPayment = ({ email, fundValue, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchSubmitAccountPayment({
        email,
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
    <PaymentContainer isModal={isModal} isOnPaymentView={open}>
      <AsyncRender
        asyncData={{}}
        component={ComponentToRender}
        isRequiredData={false}
        loading={loading}
        propsToPassDown={{
          alerts,
          awardedUser,
          balance,
          dispatchPaypalPayment,
          email: userEmail,
          errors,
          handleClearPaymentAlerts,
          handleIncrement,
          handleStripeToken,
          handleSubmitAccountPayment,
          handleValidateInput,
          isInFundingQueue,
          isPullRequestMerged,
          issueId,
          open,
          rep,
          step,
          ...restProps,
        }}
      />
    </PaymentContainer>
  );
};

PaymentsContainer.defaultProps = {
  awardedUser: null,
  isInFundingQueue: false,
  isModal: false,
  isPullRequestMerged: false,
};

PaymentsContainer.propTypes = {
  activeUser: T.object,
  alerts: T.object,
  awardedUser: T.object,
  dispatchInputError: T.func,
  dispatchPaypalPayment: T.func,
  dispatchResetState: T.func,
  dispatchStripeToken: T.func,
  dispatchSubmitAccountPayment: T.func,
  errors: T.object,
  handleClearPaymentAlerts: T.func,
  handleIncrement: T.func.isRequired,
  isInFundingQueue: T.bool,
  isModal: T.bool,
  isPullRequestMerged: T.bool,
  issueId: T.string,
  loading: T.bool.isRequired,
  open: T.bool.isRequired,
  rep: T.number.isRequired,
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
  loading: makeSelectPayments('loading'),
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
