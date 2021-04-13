import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { PrimaryAsyncButton, PrimaryButton } from 'components/base_ui';
import {
  buttonGrey,
  cardHeaderFontSize,
  commentHeaderColor,
  defaultFontSize,
  fundingText,
  landingButtonGreen,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const Amount = styled.span`
  color: ${fundingText};
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.4rem;
  white-space: nowrap;
`;

export const ButtonGroup = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export const DonationRow = styled.div`
  align-items: center;
  background-color: ${commentHeaderColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.6rem 2.4rem;
  width: ${({ hasPayoutUrl }) => (hasPayoutUrl ? '48%' : '31%')};

  ${mobile} {
    margin: 1rem 0;
    padding: 2rem;
    width: 100%;
  }
`;

export const DonationsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${mobile} {
    flex-direction: column;
  }
`;

export const DonationTitle = styled.div`
  color: #586069;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

export const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PayoutContainer = styled.div`
  padding: 2rem;
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: ${({ hasPadding }) => (hasPadding ? '2rem 0' : '0 0  2rem')};
  text-align: justify;
`;

export const StyleDropdown = styled(Select)`
  margin: 0.5rem 0;
  width: 50%;

  .MuiOutlinedInput-input {
    color: ${textColor};
    font-size: ${defaultFontSize};
    padding: 1.4rem;
  }

  .MuiSelect-select:focus {
    background: white;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  color: ${textColor};
  font-size: ${defaultFontSize};
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  background-color: ${landingButtonGreen};

  &:hover {
    background-color: ${landingButtonGreen};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: ${buttonGrey};

  &:hover {
    background-color: ${buttonGrey};
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: ${cardHeaderFontSize};
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;
