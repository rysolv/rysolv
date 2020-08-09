import React from 'react';
import T from 'prop-types';

import { PaypalButton } from 'components/base_ui';

import { InputHeader, InputWrapper } from './styledComponents';

const PaypalPaymentComponent = ({
  dispatchPaypalPayment,
  dollarValue,
  handleValidateInput,
  userId,
}) => (
  <InputWrapper>
    <InputHeader>Sign in to</InputHeader>
    <PaypalButton
      dispatchPaypalPayment={dispatchPaypalPayment}
      dollarValue={dollarValue}
      handleValidateInput={handleValidateInput}
      userId={userId}
      values={{
        field: 'depositValue',
        values: { depositValue: dollarValue },
      }}
    />
  </InputWrapper>
);

PaypalPaymentComponent.propTypes = {
  dispatchPaypalPayment: T.func.isRequired,
  dollarValue: T.string.isRequired,
  handleValidateInput: T.func.isRequired,
  userId: T.string.isRequired,
};

export default PaypalPaymentComponent;
