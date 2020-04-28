import React from 'react';
import styled, { css } from 'styled-components';

import {
  primaryButtonColor,
  primaryButtonHoverColor,
  secondaryButtonColor,
  secondaryButtonHoverColor,
  detailFontSize,
} from 'defaultStyleHelper';

import BaseButton from './BaseButton';
import BaseAsyncButton from './BaseAsyncButton';

const baseButtonStyle = css`
  &:active {
    box-shadow: none;
  }
  background-color: ${primaryButtonColor};
  box-shadow: none;
  color: white;
  font-size: ${detailFontSize};
  white-space: nowrap;
  font-weight: 400;
  margin: 1rem;
  min-width: 6.5rem;
  width: auto;
`;

export const PrimaryButton = styled(BaseButton)`
  ${baseButtonStyle};

  &:hover {
    background-color: ${primaryButtonHoverColor};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  &:hover {
    background-color: ${secondaryButtonHoverColor};
  }

  background-color: ${secondaryButtonColor};
  color: white;
`;

export const PrimaryAsyncButton = styled(BaseAsyncButton)`
  ${baseButtonStyle};

  &:hover {
    background-color: ${primaryButtonHoverColor};
  }

  & .progressWheel {
    color: inherit;
  }
`;

export const SecondaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: ${secondaryButtonHoverColor};
  }

  background-color: ${secondaryButtonColor};
  color: white;
`;

export const FlatIconButton = styled(({ disabled, ...restProps }) => (
  <BaseButton disabled={disabled} {...restProps} />
))`
  &:hover {
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
  }

  &:active {
    background-color: transparent;
    box-shadow: none;
  }

  &:disabled {
    background-color: transparent;
  }

  background-color: transparent;
  box-shadow: none;
`;
