import React from 'react';
import T from 'prop-types';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { StripeInput, TooltipIcon } from 'components/base_ui';
import { CvvTooltip } from 'components/Tooltips';
import iconDictionary from 'utils/iconDictionary';

import {
  HorizontalWrapper,
  InputHeader,
  InputWrapper,
  StyledBaseTextInput,
  StyledPrimaryAsyncButton,
  TooltipIconWrapper,
} from './styledComponents';

const InfoIcon = iconDictionary('info');

const CreditCardPaymentComponent = ({
  amount,
  handleClearAllAlerts,
  handleStripeToken,
  handleZipChange,
  setStripeError,
  setZipValue,
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
    handleClearAllAlerts();

    if (result.error) {
      setStripeError({ message: result.error.message });
    } else {
      handleStripeToken({
        amount,
        token: result.token,
        values: { depositValue: amount },
      });
    }
  };
  return (
    <div>
      <InputWrapper width="50%">
        <InputHeader>Card Number</InputHeader>
        <StyledBaseTextInput
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
            },
          }}
          variant="outlined"
        />
      </InputWrapper>
      <HorizontalWrapper>
        <InputWrapper width="50%">
          <InputHeader>Expiration Date</InputHeader>
          <StyledBaseTextInput
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
            variant="outlined"
          />
        </InputWrapper>
        <InputWrapper width="35%">
          <InputHeader>
            CVV
            <TooltipIconWrapper>
              <TooltipIcon Icon={InfoIcon} Tooltip={CvvTooltip} />
            </TooltipIconWrapper>
          </InputHeader>
          <StyledBaseTextInput
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
            variant="outlined"
          />
        </InputWrapper>
      </HorizontalWrapper>
      <InputWrapper width="25%">
        <InputHeader>Postal Code</InputHeader>
        <StyledBaseTextInput
          inputProps={{ maxLength: 5 }}
          onChange={e => handleZipChange(e, e.target.value, setZipValue)}
          value={zipValue}
          variant="outlined"
        />
      </InputWrapper>
      <StyledPrimaryAsyncButton
        disabled={amount <= 0}
        label="Confirm"
        onClick={handleSubmit}
      />
    </div>
  );
};

CreditCardPaymentComponent.propTypes = {
  amount: T.string,
  handleClearAllAlerts: T.func,
  handleStripeToken: T.func,
  handleZipChange: T.func,
  setStripeError: T.func,
  setZipValue: T.func,
  zipValue: T.string,
};

export default CreditCardPaymentComponent;
