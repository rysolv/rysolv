import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  ErrorSuccessBanner,
  PrimaryAsyncButton,
  PrimaryButton,
} from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  defaultFontFamily,
  defaultFontSize,
  errorRed,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, mobile, mobileS } = mediaQueriesByDevice;

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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
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
  max-width: 140rem;
  width: 100%;

  ${laptop} {
    margin: 0 3rem;
  }
`;

export const ContentGroup = styled.div`
  align-self: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  max-width: 50rem;
`;

export const DescriptionWrapper = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
`;

export const EditCompanyContainer = styled.div`
  width: 100%;
`;

export const EditCompanyHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0 1rem;
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
  margin-top: 1rem;
  text-align: left;
`;

export const QuestionWrapper = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin-bottom: 0.8rem;
`;

export const StyledButton = styled(Button)`
  color: ${darkBlueColor};
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
  align-self: center;
  height: auto;
  max-width: 50rem;
  text-align: left;
  width: 100%;
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
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

export const ViewContainer = styled.div`
  background: ${whiteColor};
  border-radius: 0.7rem;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  justify-content: space-between;
  margin: 5rem auto 0;
  max-width: 75rem;
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
