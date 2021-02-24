import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import {
  BaseAutocomplete,
  GithubButton,
  PrimaryAsyncButton,
  PrimaryButton,
  SecondaryButton,
} from 'components/base_ui';
import {
  defaultFontFamily,
  defaultFontSize,
  fundingOpenBackground,
  fundingText,
  headerFontSize,
  hoverLinkColor,
  landingButtonGreen,
  languageBackground,
  languageText,
  lightBlueColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, mobileS } = mediaQueriesByDevice;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${({ shouldDisplayBack, shouldDisplayCancel }) =>
    shouldDisplayBack || shouldDisplayCancel ? 'space-between' : 'flex-end'};
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  align-self: center;
  display: flex;
`;

export const DescriptionBullets = styled.div`
  display: flex;

  li {
    align-items: center;
    display: flex;
    list-style-type: none;
    margin: 1.5rem 0;
  }

  svg {
    color: ${landingButtonGreen};
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
  }
`;

export const DescriptionContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  text-align: center;
`;

export const DescriptionTitle = styled.div`
  color: ${lightBlueColor};
  font-size: 3.6rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-align: center;
`;

export const DescriptionWrapper = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;

export const IconWrapper = styled.div`
  align-self: center;
  background: ${fundingOpenBackground};
  border-radius: 50%;
  height: 5rem;
  width: 5rem;

  svg {
    color: ${fundingText};
    height: 4rem;
    margin: 0.5rem auto;
    width: 4rem;
  }
`;

export const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  ${mobile} {
    width: 100%;
  }
`;

export const JobsHeader = styled.div`
  color: ${textColor};
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 0;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const LinkWrapper = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const OptionWrapper = styled.div`
  margin: 5rem auto;
  width: 75%;
`;

export const QuestionWrapper = styled.div`
  color: ${textColor};
  font-size: 2.6rem;
  font-weight: 500;
`;

export const StyledBaseAutocomplete = styled(BaseAutocomplete)`
  margin: 0 auto;
  width: 70%;
  .tag {
    background-color: ${languageBackground};
    color: ${languageText};
    font-size: 1.2rem;
  }
`;

export const StyledButton = styled(
  ({
    shouldDisplayBack,
    shouldDisplayCancel,
    shouldDisplaySubmit,
    ...restProps
  }) => <Button {...restProps} />,
)`
  color: ${lightBlueColor};
  display: ${({
    shouldDisplayBack,
    shouldDisplayCancel,
    shouldDisplaySubmit,
  }) =>
    shouldDisplayBack || shouldDisplayCancel || shouldDisplaySubmit
      ? 'inherit'
      : 'none'};
  font-family: ${defaultFontFamily};
  font-size: ${subheaderFontSize};
  font-weight: 500;
  margin: 1rem;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }

  svg {
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
  }

  ${mobileS} {
    justify-content: start;
    width: 100%;
  }
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
`;

export const StyledGithubButton = styled(GithubButton)`
  width: auto;
  font-size: 1.6rem;
`;

export const StyledParagraph = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  padding-top: 2rem;
`;

export const StyledPrimaryAsyncButton = styled(
  ({ shouldDisplaySubmit, ...restProps }) => (
    <PrimaryAsyncButton {...restProps} />
  ),
)`
  align-self: center;
  display: ${({ shouldDisplaySubmit }) =>
    shouldDisplaySubmit ? 'inherit' : 'none'};
`;

export const StyledPrimaryButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  background-color: ${({ isSelected }) =>
    isSelected ? lightBlueColor : 'white'};
  border: 0.1rem solid ${lightBlueColor};
  color: ${({ isSelected }) => (isSelected ? 'white' : lightBlueColor)};
  font-size: 1.6rem;
  min-width: 20rem;

  &:hover {
    background-color: ${lightBlueColor};
    color: white;
  }
`;

export const StyledSecondaryButton = styled(
  ({ shouldDisplayBack, ...restProps }) => <SecondaryButton {...restProps} />,
)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};
  display: ${({ shouldDisplayBack }) =>
    shouldDisplayBack ? 'inherit' : 'none'};

  &:hover {
    background-color: white;
  }
`;

export const ViewContainer = styled.div`
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  justify-content: ${({ isFinalView }) =>
    isFinalView ? 'inherit' : 'space-between'};
  margin: 0 auto;
  min-height: 50rem;
  padding: 3.8rem 2.6rem;
  text-align: center;
  width: 100%;

  ${mobile} {
    padding: 2rem 0.5rem;
  }
`;
