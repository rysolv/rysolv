import styled from 'styled-components';

import PaymentPortal from 'components/Payments';

export const IconWrapper = styled.div`
  padding: ${({ isFirstStep }) => (isFirstStep ? '0 1rem' : '1rem')};
  position: absolute;
  right: 0;

  svg {
    color: ${({ isFirstStep }) => (isFirstStep ? 'inherit' : 'white')};
  }
`;

export const PaymentPortalContainer = styled.div`
  padding: ${({ isFirstStep }) => (isFirstStep ? '1rem' : '0')};
  position: relative;
`;

export const StyledPaymentPortal = styled(PaymentPortal)`
  border-radius: none;
  border: none;
`;
