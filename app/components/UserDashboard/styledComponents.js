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
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet } = mediaQueriesByDevice;

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

export const ButtonWrapper = styled.div`
  display: flex;
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
  align-items: center;
  margin-top: 1rem;
  right: 0;
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

export const UserDashboardContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  ${tablet} {
    flex-direction: column;
  }
`;

export const UserDashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 8.3rem);
`;

export const UserDashboardHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 0 0 3rem;
`;
