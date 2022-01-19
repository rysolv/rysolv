import styled from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  ${laptop} {
    padding: 5rem 3rem 5.6rem;
  }
`;
