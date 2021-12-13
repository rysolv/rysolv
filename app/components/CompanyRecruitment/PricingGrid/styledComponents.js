import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';

import {
  lightBlueColor,
  grayColor,
  defaultFontSize,
  detailFontSize,
  whiteColor,
  textColor,
} from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet, mobile } = mediaQueriesByDevice;

export const BulletWraper = styled.div``;

export const BulletTextWrapper = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColumnWrapper = styled.div`
  width: ${({ focus }) => (focus ? '32rem' : '30rem')};
  margin: ${({ focus }) => (focus ? '1rem 1.5rem 0' : '3rem 1rem 3rem')};

  border-radius: 1rem;
  box-shadow: ${({ focus }) =>
    focus ? `0.1rem 0.5rem 1rem ${grayColor}` : `0 0.1rem 0.4rem ${grayColor}`};

  overflow: hidden;
  color: ${textColor};

  ${mobile} {
    margin: 1.5rem 1rem;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.5rem;

  color: ${lightBlueColor};
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const PricingBody = styled.div`
  font-size: ${defaultFontSize};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: space-between;
  height: 40rem;

  ${tablet} {
    padding: 1rem;
  }
  ${mobile} {
    height: auto;
  }
`;

export const PricingGridContainer = styled.div`
  display: flex;
  justify-content: center;

  ${mobile} {
    flex-wrap: wrap;
  }
`;

export const PricingHeader = styled.div`
  background-color: ${lightBlueColor};
  color: ${whiteColor};
  padding: ${({ focus }) => (focus ? '4rem 2rem 2rem' : '2rem')};
  text-align: center;
`;

export const PricingSubTitle = styled.div`
  font-size: ${defaultFontSize};
`;

export const PricingTitle = styled.div`
  font-size: 2.6rem;
  margin-bottom: 1rem;
`;
export const StyledBullets = styled.div`
  font-size: 1.6rem;
  display: flex;
  margin-bottom: 1rem;
`;

export const StyledCost = styled.div`
  font-size: 3.2rem;
  font-weight: 500;
`;

export const StyledCostWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  ${tablet} {
    flex-wrap: wrap;
  }
  ${mobile} {
    margin: 2rem 0 0;
  }
`;

export const StyledDollarSign = styled.div`
  align-self: start;
  line-height: 3rem;
`;

export const StyledInterval = styled.div`
  align-self: end;
  line-height: 3rem;
  margin-left: 0.5rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: ${lightBlueColor};
  align-self: center;
  width: 18rem;

  &:hover {
    background-color: ${lightBlueColor};
  }
`;
export const StyledSubtext = styled.div`
  color: grey;
  text-align: center;
  font-size: ${detailFontSize};
`;
