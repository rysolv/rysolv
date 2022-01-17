/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import {
  grayColor,
  lightBlueColor,
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
  width: 20rem;
`;

export const BulletTextWrapper = styled.div`
  font-size: 1.6rem;
  line-height: 2.208rem;
`;

export const IconWrapper = styled.div`
  color: ${lightBlueColor};
  margin-right: 0.6rem;

  path {
    stroke-width: 0.2rem;
    stroke: ${lightBlueColor};
  }

  svg {
    height: ${({ isSettingRoute }) => (isSettingRoute ? '1em' : '2rem')};
    width: ${({ isSettingRoute }) => (isSettingRoute ? '1em' : '2rem')};
  }

  @media (max-width: 1198px) {
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
`;

export const PricingBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  height: 100%;
  justify-content: space-between;
  padding: 2.4rem;
`;

export const PricingCard = styled.div`
  border-radius: 0.7rem;
  border: ${({ focus }) => (focus ? `0.2rem solid ${lightBlueColor}` : 'none')};
  box-shadow: ${({ focus }) =>
    focus ? `0 0.4rem 0.7rem ${grayColor}` : `0 0.1rem 0.4rem ${grayColor}`};
  color: ${textColor};
  display: flex;
  flex-direction: column;
  height: ${({ focus }) => (focus ? '53.7rem' : '50.4rem')};
  width: calc(100% / 3.2);

  @media (max-width: 1198px) {
    height: ${({ focus, isSettingRoute }) =>
      // eslint-disable-next-line no-nested-ternary
      isSettingRoute ? '44.8rem' : focus ? '53.7rem' : '50.4rem'};
    margin-bottom: ${({ isLast, isSettingRoute }) =>
      isSettingRoute && !isLast ? '1.6rem' : 0};
    width: ${({ isSettingRoute }) =>
      isSettingRoute ? '30.558rem' : 'calc(100% / 3.2)'};
  }

  @media (max-width: 829px) {
    border: none;
    box-shadow: 0 0.1rem 0.4rem ${grayColor};
    height: ${({ focus }) => (focus ? '48.1rem' : '44.8rem')};
    margin-bottom: ${({ isLast }) => (isLast ? 0 : '1.6rem')};
    width: 30.558rem;
  }

  @media (max-width: 370px) {
    width: auto;
  }
`;

export const PricingGridContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1198px) {
    flex-direction: ${({ isSettingRoute }) =>
      isSettingRoute ? 'column' : 'row'};
  }

  @media (max-width: 829px) {
    flex-direction: column;
  }
`;

export const PricingHeader = styled.div`
  background: ${lightBlueColor};
  border-top-left-radius: ${({ focus }) => (focus ? 0 : '0.7rem')};
  border-top-right-radius: ${({ focus }) => (focus ? 0 : '0.7rem')};
  color: ${whiteColor};
  padding: 2.4rem;
  text-align: center;

  @media (max-width: 829px) {
    border-top-left-radius: 0.7rem;
    border-top-right-radius: 0.7rem;
  }
`;

export const PricingSubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.208rem;
  white-space: nowrap;
`;

export const PricingTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.45rem;
`;

export const StyledBullets = styled.div`
  display: flex;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
`;

export const StyledCost = styled.div`
  font-size: ${({ isSettingRoute }) => (isSettingRoute ? '2.5rem' : '3.2rem')};
  font-weight: 700;
  line-height: 3.36rem;
  white-space: nowrap;

  @media (max-width: 1198px) {
    font-size: 3.2rem;
  }
`;

export const StyledCostWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;

export const StyledInterval = styled.div`
  align-self: end;
  line-height: 2.4rem;
  margin-left: 0.6rem;
  white-space: nowrap;
`;

export const StyledPrimaryButton = styled(
  ({ isSettingRoute, ...restProps }) => <PrimaryButton {...restProps} />,
)`
  ${baseButtonStyle};
  background: ${lightBlueColor};
  color: ${whiteColor};
  margin: auto;
  width: ${({ isSettingRoute }) => (isSettingRoute ? '15rem' : '20rem')};

  &:hover {
    background: ${lightBlueColor};
    color: ${whiteColor};
  }

  @media (max-width: 1198px) {
    width: 20rem;
  }
`;
