import React from 'react';

import { PaypalButton } from 'components/base_ui';

import { InputHeader, InputWrapper } from './styledComponents';

const PaypalPaymentComponent = () => (
  <InputWrapper>
    <InputHeader>Sign in to</InputHeader>
    <PaypalButton />
  </InputWrapper>
);

export default PaypalPaymentComponent;
