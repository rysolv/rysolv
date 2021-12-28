import styled from 'styled-components';

import { blueColor, whiteColor } from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const CompanyPricingContainer = styled.div`
  color: ${blueColor};
  height: 100%;
  background-color: ${whiteColor};
  padding: 5rem 5rem 0;
  position: relative;
  z-index: 1;

  ${laptop} {
    padding: 5rem 0 0;
  }
`;

export const CompanyPricingHeader = styled.div`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 3.873rem;

  @media (max-width: 500px) {
    font-size: 2.8rem;
    line-height: 2.931rem;
  }

  @media (max-width: 370px) {
    font-size: 2.4rem;
    line-height: 2.431rem;
  }
`;
