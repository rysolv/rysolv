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

import {
  CreditCardViewContainer,
  HorizontalInputWrapper,
  InputWrapper,
  StyledPaymentTextInput,
  StyledPrimaryAsyncButton,
  TextWrapper,
} from './styledComponents';

const CreditCardView = ({
  fundValue,
  handleClearAlerts,
  handleStripeToken,
  handleZipChange,
  isCreditPaymentOpen,
  isPersonalInfoComplete,
  setStripeError,
  setZipValue,
  values,
  zipValue,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card, zipValue);
    handleClearAlerts();

    if (result.error) {
      setStripeError({ message: result.error.message });
    } else {
      handleStripeToken({
        amount: fundValue,
        token: result.token,
        values,
      });
    }
  };
  return (
    <ConditionalRender
      Component={
        <Fragment>
          <CreditCardViewContainer>
            <TextWrapper>
              A 3.6% standard transaction fee will be added to cover credit card
              processing and the safe transfer of funds.
            </TextWrapper>
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
  fundValue: T.oneOfType([T.number, T.string]),
  handleClearAlerts: T.func,
  handleStripeToken: T.func,
  handleZipChange: T.func,
  isCreditPaymentOpen: T.bool,
  isPersonalInfoComplete: T.bool,
  setStripeError: T.func,
  setZipValue: T.func,
  values: T.object,
  zipValue: T.string,
};

export default CreditCardView;
