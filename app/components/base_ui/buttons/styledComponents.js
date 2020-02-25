import styled, { css } from 'styled-components';
import BaseButton from './BaseButton';
import BaseAsyncButton from './BaseAsyncButton';

const baseButtonStyle = css`
  &:active {
    box-shadow: none;
  }
  box-shadow: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 1rem;
`;

export const PrimaryButton = styled(BaseButton)`
  ${baseButtonStyle},

  &:hover {
    background-color: green;
  }

  background-color: blue;
  color: white;
`;

export const SecondaryButton = styled(PrimaryButton)`
  &:hover {
    background-color: pink;
  }

  background-color: purple;
  color: white;
`;

export const PrimaryAsyncButton = styled(BaseAsyncButton)`
  ${baseButtonStyle},

  &:hover {
    background-color: green;
  }

  background-color: blue;
  color: white;

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
