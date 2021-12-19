import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';

import {
  defaultFontSize,
  grayColor,
  lightBlueColor,
  successGreen,
  whiteColor,
} from 'defaultStyleHelper';

export const InputContainer = styled.div`
  display: flex;
  margin-top: 0.8rem;
`;

export const PlanContainer = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  display: flex;
  flex-direction: column;
  margin: 1rem;
  max-width: 40rem;
  overflow: hidden;
  width: 100%;
`;

export const PlanHeader = styled.div`
  background-color: ${lightBlueColor};
  color: ${whiteColor};
  font-size: 2.2rem;
  padding: 1.5rem 0;
  text-align: center;
`;

export const PricingSubTitle = styled.div`
  font-size: ${defaultFontSize};
`;

export const PricingTitle = styled.div`
  font-size: 2.6rem;
  margin-bottom: 1rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  background-color: ${({ selected }) => (selected ? 'green' : lightBlueColor)};
  min-width: 18rem;

  &:hover {
    background: ${({ selected }) => (selected ? successGreen : lightBlueColor)};
  }
`;
