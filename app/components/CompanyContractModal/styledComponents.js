import styled, { css } from 'styled-components';

import { PrimaryAsyncButton, PrimaryButton } from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  lightBlueColor,
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

export const ContentGroup = styled.div`
  align-self: center;
  color: ${textColor};
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

export const LegalTextWrapper = styled.div`
  margin-top: 1rem;
  text-align: justify;
`;

export const ModalContainer = styled.div`
  padding: 2rem;
  width: 50rem;

  @media (max-width: 560px) {
    width: auto;
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
    background-color: ${whiteColor};
    color: ${darkBlueColor};
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
  padding: ${({ isFirst }) => (isFirst ? `0.6rem 0` : `0.8rem 0 3.4rem`)};
`;
