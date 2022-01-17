import styled from 'styled-components';

import { blueColor, lightGreyColor } from 'defaultStyleHelper';

export const PricingContainer = styled.div`
  width: 100%;
`;

export const PricingHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 0 0 3rem;
`;

export const PricingSubText = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 5.6rem;
`;
