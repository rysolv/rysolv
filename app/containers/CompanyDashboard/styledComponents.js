import styled from 'styled-components';

import { grayColor, whiteColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const VerticalDivider = styled.div`
  background: ${grayColor};
  height: 100%;
  margin: 0 4rem;
  width: 0.1rem;
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  ${laptop} {
    padding: 5rem 3rem 5.6rem;
  }

  @media (max-width: 370px) {
    padding: 0 3rem 5.6rem;
  }
`;
