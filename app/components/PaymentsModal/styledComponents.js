import styled from 'styled-components';

import PaymentPortal from 'containers/Payments';

export const IconWrapper = styled.div`
  float: right;
`;

export const PaymentPortalContainer = styled.div`
  padding: 1rem;
`;

export const StyledPaymentPortal = styled(PaymentPortal)`
  border: none;
  border-radius: none;
`;
