import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledBackNav = styled(Link)`
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
