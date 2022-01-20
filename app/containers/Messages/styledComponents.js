import styled from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { desktop, laptop } = mediaQueriesByDevice;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  padding: 5rem 12rem 5.6rem;
  position: relative;
  width: 100%;

  ${desktop} {
    padding: 5rem 3rem 5.6rem;
  }

  ${laptop} {
    padding: 0 3rem 5.6rem;
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;
