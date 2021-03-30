import styled from 'styled-components';

import { borderColor, textColor } from 'defaultStyleHelper';

export const PaymentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: ${({ isModal }) =>
    isModal ? 'none' : `0.1rem solid ${borderColor}`};
  color: ${textColor};
  min-height: ${({ isOnPaymentView }) => (isOnPaymentView ? '46rem' : 'auto')};
  width: 100%;
`;
