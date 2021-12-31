import React from 'react';

import {
  LoadingContainer,
  StyledLoadingIndicator,
  Subtext,
} from './styledComponents';

const PaymentLoadingIndicator = () => (
  <LoadingContainer>
    <StyledLoadingIndicator />
    <Subtext>Updating payment method...</Subtext>
  </LoadingContainer>
);

export default PaymentLoadingIndicator;
