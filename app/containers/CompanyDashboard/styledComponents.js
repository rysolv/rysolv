import styled from 'styled-components';

import { blueColor } from 'defaultStyleHelper';

export const ViewContainer = styled.div`
  background: ${blueColor};
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  @media (max-width: 700px) {
    padding: 5rem 3rem 5.6rem;
  }

  @media (max-width: 370px) {
    padding: 0 3rem 5.6rem;
  }
`;
