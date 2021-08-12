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
  blueColor,
  commentHeaderColor,
  darkBlueColor,
  defaultFontFamily,
  defaultFontSize,
  errorRed,
  headerFontSize,
  languageBackground,
  languageText,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, mobile, mobileS } = mediaQueriesByDevice;

export const BottomFade = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 90%
  );
  bottom: 0;
  height: 15rem;
  left: 0;
  position: absolute;
  width: 100%;
`;

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
  align-self: center;
  display: flex;
  justify-content: space-around;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;

    @media (max-width: 400px) {
      padding: 0;
    }
  }

  span {
    align-items: center;
    display: flex;
    list-style-type: none;
    margin: 1.5rem 0;
  }

  svg {
    background: ${darkBlueColor};
    border-radius: 50%;
    color: white;
    height: 2.5rem;
    margin-right: 1rem;
    padding: 0.2rem;
    width: 2.5rem;
  }

  ${mobile} {
    align-self: center;
    flex-direction: column;
  }
`;

export const DescriptionContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  text-align: left;
`;

export const DescriptionSubTitle = styled.b`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 3.2rem 0 0.8rem;
  text-align: center;

  ${mobile} {
    font-size: 2.5rem;
  }
`;

export const DescriptionTitle = styled.div`
  color: ${darkBlueColor};
  font-size: 5.6rem;
  font-weight: 700;
  line-height: 6.16rem;

  ${mobile} {
    font-size: 3.2rem;
    line-height: 3.36rem;
  }
`;

export const DescriptionWrapper = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

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

export const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12rem;
  max-width: 120rem;
  width: 100%;

  ${laptop} {
    margin: 0 3rem;
  }
`;

export const JobsHeader = styled.div`
  color: ${textColor};
  font-size: ${headerFontSize};
  margin-bottom: 5rem;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const LinkWrapper = styled(Link)`
  color: ${blueColor};

  &:hover {
    color: ${blueColor};
  }
`;

export const OptionWrapper = styled.div`
  margin: 5rem auto;
`;

export const QuestionWrapper = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 3.2rem 0 0.8rem;
`;

export const SampleWrapper = styled.div`
  background: ${commentHeaderColor};
  margin: 2rem 0;
  opacity: 0.9;
  padding: 2rem;
  position: relative;

  ${mobile} {
    margin: 2rem -2rem;
  }
`;

export const StyledBaseAutocomplete = styled(BaseAutocomplete)`
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
  color: ${darkBlueColor};
  display: ${({
    shouldDisplayBack,
    shouldDisplayCancel,
    shouldDisplaySubmit,
  }) =>
    shouldDisplayBack || shouldDisplayCancel || shouldDisplaySubmit
      ? 'inherit'
      : 'none'};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
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
  }
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
`;

export const StyledGithubButton = styled(GithubButton)`
  align-items: center;
  background: ${darkBlueColor};
  border-radius: 0.8rem;
  color: ${whiteColor};
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  text-transform: initial;
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
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
  background: ${whiteColor};
  border-radius: 0.7rem;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  justify-content: ${({ isFinalView }) =>
    isFinalView ? 'inherit' : 'space-between'};
  margin: 5rem 0 0;
  min-height: 50rem;
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
