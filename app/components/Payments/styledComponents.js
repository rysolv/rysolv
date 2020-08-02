import styled from 'styled-components';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import {
  ErrorSuccessBanner,
  PaymentTextInput,
  PrimaryAsyncButton,
} from 'components/base_ui';

import {
  borderColor,
  defaultFontSize,
  dividerBorder,
  fundingText,
} from 'defaultStyleHelper';

export const Amount = styled.div`
  align-self: center;
  font-size: 2.4rem;
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
  background-color: #f6f8fa;
  border-radius: 0.3rem;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 1rem;
  width: 80%;
`;

export const ConfirmAmount = styled.div`
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

export const PaymentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: ${({ removeBorder }) =>
    removeBorder ? 'none' : `0.1rem solid ${borderColor}`};
  color: rgba(0, 0, 0, 0.7);
`;

export const PaymentInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const PaypalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem 2rem 2rem;
  width: 100%;
`;

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

export const StyledLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  text-align: left;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  height: 3rem;
  width: auto;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin: 1rem;
`;

export const StyledPaymentTextInput = styled(PaymentTextInput)`
  align-self: center;
  margin: 0.5rem 0.5rem 1rem;
  width: 80%;
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

export const TextWrapper = styled.div`
  font-size: 1.2rem;
  margin: auto;
  padding-bottom: 0;
  padding: 2rem 0;
  text-align: left;
  width: 80%;
`;

export const YourAccountContainer = styled.div`
  margin: 0.5rem 0;
  text-align: center;
  width: 100%;
`;
