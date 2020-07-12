import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledBackNav = styled.a`
  align-self: flex-start;
  color: grey;
  display: inline-flex;
  font-size: ${defaultFontSize};
  margin: 1rem 0;

  &:hover {
    color: ${textColor};
    cursor: pointer;
  }
`;
