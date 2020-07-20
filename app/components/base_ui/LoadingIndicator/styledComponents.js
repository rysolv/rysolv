import styled from 'styled-components';
import { headerColor } from 'defaultStyleHelper';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 25rem;
  justify-content: center;
  width: 100%;

  * {
    stroke: ${headerColor};
  }
`;
