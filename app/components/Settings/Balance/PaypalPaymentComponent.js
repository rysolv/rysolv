import React from 'react';
import T from 'prop-types';

import { PaypalButton } from 'components/base_ui';

import { InputHeader, InputWrapper } from './styledComponents';

const PaypalPaymentComponent = ({ dispatchPaypalPayment, total, userId }) => (
  <InputWrapper>
    <InputHeader>Sign in to</InputHeader>
    <PaypalButton
      dispatchPaypalPayment={dispatchPaypalPayment}
      total={total}
      userId={userId}
    />
  </InputWrapper>
);

PaypalPaymentComponent.propTypes = {
  dispatchPaypalPayment: T.func.isRequired,
  total: T.string.isRequired,
  userId: T.string.isRequired,
};

export default PaypalPaymentComponent;
