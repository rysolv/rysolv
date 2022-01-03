import React from 'react';
import styled, { css } from 'styled-components';

import {
  ErrorSuccessBanner,
  PrimaryAsyncButton,
  PrimaryButton,
} from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  defaultFontSize,
  errorRed,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
  width: 10rem;
`;

const baseOptionTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const Asterisk = styled.span`
  margin-right: 0.6rem;
  margin-top: 0.3rem;
`;

export const ButtonGroup = styled.div`
  border-radius: 0.8rem;
  border: 0.2rem solid ${darkBlueColor};
  margin-bottom: 3.2rem;
  overflow: clip;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const DisclaimerWrapper = styled.div`
  color: ${lightGreyColor};
  display: flex;
  font-size: 1.6rem;
  margin-top: 1.6rem;
`;

export const ModalContainer = styled.div`
  padding: 2rem;
  width: 50rem;
`;

export const OptionError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const OptionLabel = styled.div`
  ${baseOptionTextStyle};
  color: ${textColor};
  font-size: 1.6rem;
`;

export const OptionWrapper = styled.div`
  align-items: center;
  margin: 1rem 0;
`;

export const PaymentTypeButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  background: ${({ isSelected }) => (isSelected ? darkBlueColor : whiteColor)};
  border-radius: 0;
  color: ${({ isSelected }) => (isSelected ? whiteColor : darkBlueColor)};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.6rem;
  margin: 0;
  text-transform: none;
  width: 50%;

  &:hover {
    background: ${darkBlueColor};
    box-shadow: none;
    color: ${whiteColor};
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  height: auto;
  margin-bottom: 3rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${whiteColor};
  border: 0.2rem solid ${darkBlueColor};
  color: ${darkBlueColor};
  margin-right: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledTitle = styled.h3`
  color: ${blueColor};
  font-size: ${({ isConfirmation }) => (isConfirmation ? '2.5rem' : '3.2rem')};
  font-weight: 700;
  line-height: 3.36rem;
  margin: 0;
  padding: 2rem 0 1rem;
`;

export const TextWrapper = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  line-height: 2.4rem;
  padding: 0.6rem 0 3.4rem;
`;
