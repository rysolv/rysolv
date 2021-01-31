import styled from 'styled-components';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import {
  ErrorSuccessBanner,
  PaymentTextInput,
  PrimaryAsyncButton,
  SecondaryButton,
} from 'components/base_ui';
import {
  buttonRed,
  commentHeaderColor,
  defaultFontSize,
  dividerBorder,
  fundingText,
  lightBlueColor,
  rewardColor,
  successGreen,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS } = mediaQueriesByDevice;

export const Amount = styled.div`
  align-self: center;
  font-size: ${({ success }) => (success ? '2.8rem' : '2.4rem')};
  font-weight: 500;
`;

export const BalanceAmount = styled.h3`
  align-self: center;
  color: rgba(0, 0, 0, 0.87);
  font-size: ${defaultFontSize};
  font-weight: 400;
  margin: 0;
`;

export const BalanceTitle = styled.span`
  color: #586069;
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.5;
`;

export const BalanceWrapper = styled.div`
  background-color: ${commentHeaderColor};
  border-radius: 0.3rem;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 1rem;
  width: 80%;
`;

export const ChargeBreakdownWrapper = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  justify-content: space-between;
  margin: auto;
  padding-bottom: 2rem;
  width: 80%;
`;

export const ChargeTitle = styled.div``;

export const ChargeValue = styled.div`
  text-align: end;
`;

export const ConfirmAmount = styled.div`
  color: ${({ isNegative }) => (isNegative ? buttonRed : 'inherit')};
  white-space: nowrap;
`;

export const ConfirmContainer = styled.div`
  font-size: ${defaultFontSize};
  margin: auto;
  width: 80%;
`;

export const ConfirmText = styled.div`
  max-width: 15rem;
  text-align: left;
`;

export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: ${({ isBold }) => (isBold ? '400' : '600')};
  justify-content: space-between;
  padding: 1rem;
`;

export const CreditCardViewContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const Divider = styled.div`
  border-top: ${dividerBorder};
  margin: 1rem auto;
  width: 90%;
`;

export const DollarValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  text-align: center;
`;

export const Funded = styled.div`
  align-self: center;
  color: ${({ isFunded }) => (isFunded ? 'rgba(0,0,0,0.4)' : fundingText)};
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem;
`;

export const FundingContainer = styled.div`
  display: ${({ open }) => (!open ? 'none' : 'inherit')};
`;

export const HorizontalInputWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 83%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const PaymentInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const PaypalContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 2rem;
  width: 100%;
`;

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

export const RewardWrapper = styled.div`
  align-items: center;
  align-self: center;
  color: ${rewardColor};
  display: flex;
  font-size: 2.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;

  svg {
    height: 2.8rem;
    margin-right: 0.5rem;
    width: 2.8rem;
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin: 1rem;
`;

export const StyledLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  text-align: left;
`;

export const StyledPaymentTextInput = styled(PaymentTextInput)`
  align-self: center;
  margin: 0.5rem 0.5rem 1rem;
  width: 80%;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  height: 3rem;
  width: auto;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};
  margin-top: 13.4rem;

  &:hover {
    background-color: white;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: center;
  white-space: nowrap;

  .button {
    &:hover {
      color: white;
      background: #31b589;
    }
  }

  .grouped {
    border-radius: inherit;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.4rem;
    margin: 0.5rem;
    padding: 1rem;
  }

  .selected {
    color: white;
    background: #31b589;
  }
`;

export const SuccessContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 6rem 1rem;
  text-align: center;
`;

export const SuccessHeader = styled.span`
  font-size: 2.4rem;
  margin-bottom: 2.5rem;
`;

export const SuccessIconWrapper = styled.div`
  align-items: center;
  background-color: ${successGreen};
  color: white;
  display: flex;
  font-size: 3rem;
  height: 10rem;
  justify-content: center;
  width: 100%;
`;

export const SuccessText = styled.span`
  font-size: ${defaultFontSize};
`;

export const TextWrapper = styled.div`
  font-size: 1.2rem;
  margin: auto;
  padding-bottom: 0;
  padding: 2rem 0;
  text-align: left;
  width: 80%;
`;

export const Title = styled.div`
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  padding: 0.75rem 7.5rem 0.75rem 0;
  white-space: nowrap;

  ${mobileXS} {
    padding-right: 4rem;
  }
`;

export const Value = styled.div`
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  padding: 0.75rem 0;
  white-space: nowrap;
`;

export const YourAccountContainer = styled.div`
  margin: 0.5rem 0;
  text-align: center;
  width: 100%;
`;
