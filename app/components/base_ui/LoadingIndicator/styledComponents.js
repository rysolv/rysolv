import styled from 'styled-components';

import { blueColor } from 'defaultStyleHelper';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 25rem;
  justify-content: center;
  width: 100%;

  * {
    stroke: ${blueColor};
  }
`;
