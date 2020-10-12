import React from 'react';
import T from 'prop-types';

import { PaypalButton } from 'components/base_ui';

import { InputHeader, InputWrapper } from './styledComponents';

const PaypalPaymentComponent = ({
  dispatchPaypalPayment,
  dollarValue,
  handleValidateInput,
}) => (
  <InputWrapper>
    <InputHeader>Sign in to</InputHeader>
    <PaypalButton
      dispatchPaypalPayment={dispatchPaypalPayment}
      dollarValue={dollarValue}
      handleValidateInput={handleValidateInput}
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
};

export default PaypalPaymentComponent;
