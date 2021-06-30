/* eslint-disable no-nested-ternary, prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  darkBlueColor,
  errorRed,
  successGreen,
  whiteColor,
} from 'defaultStyleHelper';

export const StyledButton = styled(({ error, success, ...restProps }) => (
  <Button {...restProps} />
))`
  background: ${({ error, success }) =>
    error
      ? errorRed
      : success
        ? successGreen
        : darkBlueColor};
  border-radius: 0.7rem;
  box-shadow: none;
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height 1.936rem;
  text-transform: capitalize;
  white-space: nowrap;
  width: 18.4rem;

  &:active {
    box-shadow: none;
  }

  &:hover {
    background: ${({ error, success }) =>
    error
      ? errorRed
      : success
        ? successGreen
        : darkBlueColor};
  }

  & .progressWheel {
    color: inherit;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;
