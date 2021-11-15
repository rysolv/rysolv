import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import {
  ErrorSuccessBanner,
  GithubButton,
  PrimaryAsyncButton,
  PrimaryButton,
} from 'components/base_ui';
import {
  borderColor,
  darkBlueColor,
  defaultFontSize,
  defaultFontFamily,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const ButtonGroup = styled.div`
  border-radius: 0.8rem;
  border: 0.2rem solid ${darkBlueColor};
  margin-bottom: 3.2rem;
  overflow: clip;
`;

export const Divider = styled.div`
  align-self: center;
  background-color: ${borderColor};
  height: 0.2rem;
  margin: 3rem 0 2rem;
  width: 100%;
`;

export const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mobile} {
    flex-direction: column;
  }
`;

export const ImportantTextWrapper = styled.span`
  color: ${textColor};
`;

export const InputFormContent = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 100%;
`;

export const InputFormWrapper = styled.div`
  background: ${whiteColor};
  border-radius: 0.7rem;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  justify-content: space-between;
  margin: 5rem auto 0;
  max-width: 75rem;
  padding: 7.5rem 10%;
  text-align: center;
  width: 100%;

  ${laptop} {
    padding: 4rem 3.2rem;
  }

  ${mobile} {
    padding: 2rem;
  }

  @media (max-width: 370px) {
    margin: 0;
  }
`;

export const InputSubText = styled.div`
  color: ${lightGreyColor};
  flex: ${({ hasFlex }) => (hasFlex ? 1 : 0)};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
`;

export const PasscodeFormContent = styled(InputFormContent)`
  align-items: center;
`;

export const PasswordRequirements = styled.div`
  color: #a9acae;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.936rem;
  margin: -1rem 0 1rem 0;
  padding: 0 0.5rem;
  text-align: left;
`;

export const RedirectText = styled.span`
  color: ${textColor};
  margin: 1rem 0 2rem;
`;

export const ResendButton = styled(Button)`
  color: #a9acae;
  font-size: ${defaultFontSize};
  margin: 1rem 0 0;
  padding: 0;
  text-align: center;
  text-transform: initial;

  &:hover {
    background: white;
    color: #a9acae;
  }
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12rem;
  max-width: 120rem;
  width: 100%;

  ${laptop} {
    margin: 0 3rem;
  }
`;

export const StyledButton = styled(Button)`
  color: ${darkBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1rem auto 0;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  align-self: center;
  height: auto;
  margin-bottom: 3.2rem;
  margin-top: ${({ hasSubText }) => (hasSubText ? '2.4rem' : '0')};
  text-align: left;
  width: 100%;
`;

export const StyledGithubButton = styled(GithubButton)`
  margin: 1rem auto;
  width: 30rem;
`;

export const StyledLink = styled(Link)`
  color: #a9acae;
  font-size: ${defaultFontSize};
  margin: 1rem 0 0;
  text-align: center;

  &:hover {
    color: #a9acae;
  }
`;

export const StyledPrimaryAsyncButton = styled(
  ({ hasSecondaryButton, ...restProps }) => (
    <PrimaryAsyncButton {...restProps} />
  ),
)`
  background: ${darkBlueColor};
  border-radius: 0.7rem;
  box-shadow: none;
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height 1.936rem;
  margin: 1rem auto;
  overflow: hidden;
  text-transform: initial;
  white-space: nowrap;
  width: 30rem;

  &:hover {
    background: ${darkBlueColor};
  }
`;

export const StyledPrimaryButton = styled(StyledPrimaryAsyncButton)``;

export const SubText = styled.div`
  color: #a9acae;
  font-size: ${defaultFontSize};
  margin: 1rem 0 0;
  text-align: center;

  a {
    color: ${lightBlueColor};
  }
`;

export const Title = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin-bottom: ${({ hasSubText }) => (hasSubText ? '0.8rem' : '3.2rem')};
`;

export const UserTypeButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  background: ${({ isSelected }) => (isSelected ? darkBlueColor : whiteColor)};
  border-radius: 0;
  color: ${({ isSelected }) => (isSelected ? whiteColor : darkBlueColor)};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4rem;
  margin: 0;
  text-transform: none;
  width: 50%;

  &:hover {
    background: ${darkBlueColor};
    box-shadow: none;
    color: ${whiteColor};
  }
`;

export const VerificationWrapper = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  height: 11rem;
  justify-content: center;
  width: 100%;
`;

export const WordDivider = styled.div`
  background: white;
  bottom: 23%;
  color: #a9acae;
  font-size: 1.6rem;
  padding: 0 5.5rem;
  position: absolute;
  text-transform: uppercase;
`;
