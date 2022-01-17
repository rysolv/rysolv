import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import { buttonGrey, successGreen } from 'defaultStyleHelper';
import { PrimaryButton } from '../Buttons';

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    margin-top: 4.5rem;
    * {
      font-size: 1.4rem;
    }
  }
  .MuiButtonBase-root {
    justify-content: center;
    padding: 0.75rem 3rem;
  }
`;

export const StyledPrimaryButton = styled(({ grey, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  background: ${({ grey }) => (grey === 'true' ? buttonGrey : successGreen)};
  font-size: 1.4rem;
  line-height: 2rem;
  margin: 1rem 0;
  width: 100%;

  svg {
    height: 3rem;
    width: 3rem;
  }

  &:hover {
    background: ${({ grey }) => (grey === 'true' ? buttonGrey : successGreen)};
  }
`;
