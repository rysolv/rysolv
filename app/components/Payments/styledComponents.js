import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import {
  PaymentModalInputWithAdornment,
  PrimaryAsyncButton,
} from 'components/base_ui';

import {
  borderColor,
  dividerBorder,
  errorRed,
  fundingText,
} from 'defaultStyleHelper';

export const Amount = styled.div`
  align-self: center;
  font-size: 2.4rem;
  font-weight: 500;
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
  color: ${({ isFunded }) => (isFunded ? errorRed : fundingText)};
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem;
`;

export const HorizontalInputWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 83%;
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 10%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const Name = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const PaymentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
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
  padding-bottom: 2rem;
`;

export const StyledBaseInputWithAdornment = styled(
  PaymentModalInputWithAdornment,
)`
  align-self: center;
  font-size: 1.4rem;
  margin: 0.5rem;
  width: 80%;
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

export const StyledReCAPTCHA = styled(ReCAPTCHA)`
  align-tems: center;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  transform: scale(0.8);
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: center;
  white-space: nowrap;

  .grouped {
    border-radius: inherit;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.4rem;
    margin: 0.5rem;
    padding: 1rem;
  }
`;

export const UsersFunded = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  justify-content: space-evenly;
  padding: 0.5rem;
`;
