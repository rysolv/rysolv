import React, { Fragment, useState } from 'react';
import T from 'prop-types';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { StripeInput } from 'components/base_ui';

import { stripeError } from '../constants';
import { DetailText, StyledPrimaryButton } from '../styledComponents';

import {
  CreditCardViewContainer,
  HorizontalInputWrapper,
  InputWrapper,
  StyledPaymentTextInput,
} from './styledComponents';

const CreditCardView = ({
  dispatchSetModalError,
  dispatchUpdatePaymentMethod,
}) => {
  const [zip, setZip] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(cardElement, zip);

    if (!error) {
      const { id, card } = token;
      dispatchUpdatePaymentMethod({
        metadata: card,
        provider: 'stripe',
        token: id,
      });
    } else {
      // Using standardized 'Something went wrong' errors for now
      // Stripe provides more detailed errors
      dispatchSetModalError({ error: stripeError });
    }
  };

  return (
    <Fragment>
      <CreditCardViewContainer>
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
              onChange={e => setZip(e.target.value)}
              value={zip}
            />
          </HorizontalInputWrapper>
        </InputWrapper>
        <StyledPrimaryButton
          disabled={!stripe}
          label="Save Card"
          onClick={() => handleSubmit()}
        />
        <DetailText>Payment authorized with Stripe</DetailText>
      </CreditCardViewContainer>
    </Fragment>
  );
};

CreditCardView.propTypes = {
  dispatchSetModalError: T.func,
  dispatchUpdatePaymentMethod: T.func,
};

export default CreditCardView;
