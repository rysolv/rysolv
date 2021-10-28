import React, { css } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { ErrorSuccessBanner } from 'components/base_ui';
import {
  darkBlueColor,
  defaultFontFamily,
  defaultFontSize,
  errorRed,
  headerFontSize,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, mobile, mobileS } = mediaQueriesByDevice;

const baseOptionTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CheckboxWrapper = styled.div`
  margin: 3rem 0;
  text-align: left;

  .PrivateSwitchBase-root-1 {
    margin: 0 0.8rem 0.25rem 0;
    padding: 0;
  }

  svg {
    color: ${lightBlueColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const CompanySignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12rem;
  max-width: 120rem;
  width: 100%;

  ${laptop} {
    margin: 0 3rem;
  }
`;

export const ContentGroup = styled.div`
  width: 75%;
`;

export const DescriptionWrapper = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;

export const FormViewHeader = styled.div`
  color: ${textColor};
  font-size: ${headerFontSize};
  margin-bottom: 5rem;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const LegalTextWrapper = styled.div`
  margin-top: ${({ isFirst }) => (isFirst ? '1rem' : '2rem')};
  text-align: justify;
`;

export const OptionDescription = styled.div`
  ${baseOptionTextStyle};
  color: #a9acae;
  font-size: 1.4rem;
  margin-top: 1rem;
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
  margin: 5rem auto;
`;

export const QuestionWrapper = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 3.2rem 0 0.8rem;
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
  margin: 0;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  ${mobileS} {
    justify-content: start;
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  height: auto;
  margin-bottom: 3rem;
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
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
