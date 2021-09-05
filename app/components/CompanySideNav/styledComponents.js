import React from 'react';
import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import { navyColor, whiteColor } from 'defaultStyleHelper';

export const CompanySideNavContainer = styled.div`
  background: ${navyColor};
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  padding: 6.4rem 10rem;
  width: 100%;
`;

export const CompanySideNavHeader = styled.div`
  color: ${whiteColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding-bottom: 1.4rem;
`;

export const PositionButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  align-items: center;
  background-color: ${({ isSelected }) =>
    isSelected ? whiteColor : 'inherit'};
  border-radius: 0.8rem;
  border: 0.2rem solid ${whiteColor};
  color: ${({ isSelected }) => (isSelected ? navyColor : whiteColor)};
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  min-width: 20rem;
  text-transform: initial;

  &:hover {
    background-color: ${whiteColor};
    color: ${navyColor};
  }
`;

export const PositionButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
`;
