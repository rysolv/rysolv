import styled from 'styled-components';

import { borderColor } from 'defaultStyleHelper';

export const PaymentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: ${({ isModal }) =>
    isModal ? 'none' : `0.1rem solid ${borderColor}`};
  color: rgba(0, 0, 0, 0.7);
  min-height: 46rem;
  width: 100%;
`;
