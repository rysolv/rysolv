import React from 'react';
import styled from 'styled-components';

import { BaseAutocomplete, PrimaryButton } from 'components/base_ui';
import {
  darkBlueColor,
  defaultFontSize,
  errorRed,
  languageBackground,
  languageText,
  whiteColor,
} from 'defaultStyleHelper';

export const Input = styled.input`
  background: ${whiteColor};
  border-radius: 0.7rem;
  border: 0.2rem solid ${darkBlueColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: 4.9rem;
  line-height: 1.936rem;
  margin-top: 0.8rem;
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const InputError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
  text-align: left;
`;

export const StyledBaseAutocomplete = styled(BaseAutocomplete)`
  .tag {
    background-color: ${languageBackground};
    color: ${languageText};
    font-size: 1.2rem;
  }
`;

export const StyledPrimaryButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  align-items: center;
  background-color: ${({ isSelected }) =>
    isSelected ? darkBlueColor : whiteColor};
  border-radius: 0.8rem;
  border: 0.2rem solid ${darkBlueColor};
  color: ${({ isSelected }) => (isSelected ? whiteColor : darkBlueColor)};
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 1rem auto;
  min-width: 20rem;
  text-transform: initial;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledTextarea = styled.textarea``;
