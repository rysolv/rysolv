import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { PrimaryButton } from 'components/base_ui';

import {
  darkBlueColor,
  defaultFontFamily,
  detailFontSize,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileS } = mediaQueriesByDevice;

export const ContentGroup = styled.div`
  align-self: center;
  padding: 1rem;
  width: 44rem;
`;

export const DescriptionWrapper = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
  text-align: left;
`;

export const DetailText = styled.div`
  font-size: ${detailFontSize};
`;

export const PaymentSelector = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const HorizontalDivider = styled.div`
  background: ${whiteColor};
  border-bottom: 0.1rem solid rgb(211 211 211 / 70%);
  height: 0.1rem;
  margin: 1.5rem 0;
`;

export const StyledButton = styled(Button)`
  color: ${darkBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
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

export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  padding: 1rem;
  width: 60%;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const Title = styled.div`
  color: ${darkBlueColor};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.36rem;
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  justify-content: space-between;
  min-width: 40rem;
  padding: 3rem;
  text-align: center;
  width: 100%;
`;
