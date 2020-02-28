import React from 'react';
import styled, { css } from 'styled-components';
import BaseButton from './BaseButton';
import BaseAsyncButton from './BaseAsyncButton';

const baseButtonStyle = css`
  &:active {
    box-shadow: none;
  }
  background-color: green;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  font-weight: 400;
  margin: 1rem;
  width: 6.5rem;
`;

export const PrimaryButton = styled(BaseButton)`
  ${baseButtonStyle};

  &:hover {
    background-color: green;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  &:hover {
    background-color: pink;
  }

  background-color: purple;
  color: white;
`;

export const PrimaryAsyncButton = styled(BaseAsyncButton)`
  ${baseButtonStyle};

  &:hover {
    background-color: green;
  }

  &.disabled {
    background-color: grey;
  }

  & .progressWheel {
    color: inherit;
  }
`;

export const SecondaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: pink;
  }

  background-color: purple;
  color: white;

  &.disabled {
    background-color: grey;
  }
`;

export const FlatIconButton = styled(({ disabled, ...restProps }) => (
  <BaseButton disabled={disabled} {...restProps} />
))`
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }

  &:active {
    background-color: transparent;
    box-shadow: none;
  }

  background-color: transparent;
  box-shadow: none;
`;
