import styled from 'styled-components';
import { defaultFontSize } from 'defaultStyleHelper';

export const StyledBackNav = styled.a`
  color: grey;
  display: inline-block;
  margin: 1rem 0;
  font-size: ${defaultFontSize};
  &:hover {
    cursor: pointer;
  }
`;
