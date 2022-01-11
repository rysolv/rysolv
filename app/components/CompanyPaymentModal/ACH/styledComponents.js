import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { defaultFontFamily, lightBlueColor } from 'defaultStyleHelper';

export const StyledButton = styled(Button)`
  color: ${lightBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  margin: 3.4rem 0;
  padding: 0rem;
  text-transform: none;
  width: 100%;

  &:hover {
    background: transparent;
  }
`;
