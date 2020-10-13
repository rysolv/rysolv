import styled from 'styled-components';

import PaymentPortal from 'components/Payments';

export const IconWrapper = styled.div`
  padding: ${({ hasPadding }) => (hasPadding ? '0 1rem' : '1rem')};
  position: absolute;
  right: 0;
`;

export const PaymentPortalContainer = styled.div`
  padding: ${({ hasPadding }) => (hasPadding ? '1rem' : '0')};
  position: relative;
`;

export const StyledPaymentPortal = styled(PaymentPortal)`
  border-radius: none;
  border: none;
`;
