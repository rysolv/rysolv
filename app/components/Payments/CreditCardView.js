import React, { Fragment } from 'react';
import T from 'prop-types';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { ConditionalRender, StripeInput } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ChargeBreakdownWrapper,
  ChargeTitle,
  ChargeValue,
  CreditCardViewContainer,
  HorizontalInputWrapper,
  InputWrapper,
  StyledPaymentTextInput,
  StyledPrimaryAsyncButton,
  TextWrapper,
  Title,
  Value,
} from './styledComponents';

const CreditCardView = ({
  emailValue,
  fundValue,
  handleClearAlerts,
  handleStripeToken,
  handleZipChange,
  isCreditPaymentOpen,
  isPersonalInfoComplete,
  setFundValue,
  setStripeError,
  setZipValue,
  values,
  zipValue,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const fundAmount = Number(fundValue);
  const feeValue = fundAmount * 0.03 + 0.3;
  const totalValue = fundAmount + feeValue;

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(card, zipValue);
    handleClearAlerts();

    if (error) {
      setStripeError({ message: error.message });
    } else {
      handleStripeToken({
        amount: fundValue,
        email: emailValue,
        token,
        values,
      });
      setFundValue('10');
    }
  };
  return (
    <ConditionalRender
      Component={
        <Fragment>
          <CreditCardViewContainer>
            <TextWrapper>
              A 3% + $0.30 standard transaction fee will be added to cover
              credit card processing and the safe transfer of funds.
            </TextWrapper>
            <ChargeBreakdownWrapper>
              <ChargeTitle>
                <Title>Transaction fee</Title>
                <Title isBold>Total due today</Title>
              </ChargeTitle>
              <ChargeValue>
                <Value>{formatDollarAmount(parseFloat(feeValue, 10))}</Value>
                <Value isBold>
                  {formatDollarAmount(parseFloat(totalValue, 10))}
                </Value>
              </ChargeValue>
            </ChargeBreakdownWrapper>
            <InputWrapper>
              <StyledPaymentTextInput
                adornmentComponent="Number"
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
                fontSize="1rem"
              />
              <StyledPaymentTextInput
                adornmentComponent="MM/YY"
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                }}
                fontSize="1rem"
              />
              <HorizontalInputWrapper>
                <StyledPaymentTextInput
                  adornmentComponent="CVC"
                  InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                      component: CardCvcElement,
                    },
                  }}
                  fontSize="1rem"
                />
                <StyledPaymentTextInput
                  adornmentComponent="Zip"
                  fontSize="1rem"
                  inputProps={{ maxLength: 5 }}
                  onChange={e =>
                    handleZipChange(e, e.target.value, setZipValue)
                  }
                  value={zipValue}
                />
              </HorizontalInputWrapper>
            </InputWrapper>
            <StyledPrimaryAsyncButton
              disabled={!isPersonalInfoComplete || !stripe}
              label="Confirm"
              onClick={handleSubmit}
            />
          </CreditCardViewContainer>
        </Fragment>
      }
      shouldRender={isCreditPaymentOpen}
    />
  );
};

CreditCardView.propTypes = {
  emailValue: T.string.isRequired,
  fundValue: T.oneOfType([T.number, T.string]),
  handleClearAlerts: T.func,
  handleStripeToken: T.func,
  handleZipChange: T.func,
  isCreditPaymentOpen: T.bool,
  isPersonalInfoComplete: T.bool,
  setFundValue: T.func,
  setStripeError: T.func,
  setZipValue: T.func,
  values: T.object,
  zipValue: T.string,
};

export default CreditCardView;
