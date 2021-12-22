import styled from 'styled-components';

import { PaymentTextInput, PrimaryAsyncButton } from 'components/base_ui';

export const CreditCardViewContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const HorizontalInputWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 83%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const StyledPaymentTextInput = styled(PaymentTextInput)`
  align-self: center;
  margin: 0.5rem 0.5rem 1rem;
  width: 80%;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  height: 3rem;
  width: auto;
`;
