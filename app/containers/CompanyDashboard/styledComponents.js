import styled from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const VerticalDivider = styled.div`
  height: 100%;
  margin-right: 4rem;
  width: 0.1rem;

  @media (max-width: 769px) {
    height: 0.1rem;
    margin: 4rem 0 2rem;
    width: 100%;
  }
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  ${laptop} {
    padding: 5rem 3rem 5.6rem;
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;
