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
} from './styledComponents';

const CreditCardView = ({
  emailValue,
  firstNameValue,
  fundValue,
  handleStripeToken,
  handleZipChange,
  hasError,
  isCreditPaymentOpen,
  issueId,
  lastNameValue,
  organizationId,
  setZipValue,
  userId,
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

    if (result.error) {
      console.log(result.error.message);
    } else {
      handleStripeToken({
        amount: fundValue,
        issueId,
        organizationId,
        token: result.token,
        userId,
      });
    }
  };
  const isCreditComplete =
    !!emailValue && !!firstNameValue && !!lastNameValue && !!zipValue;
  return (
    <ConditionalRender
      Component={
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
                  onChange={e =>
                    handleZipChange(e, e.target.value, setZipValue)
                  }
                  value={zipValue}
                />
              </HorizontalInputWrapper>
            </InputWrapper>
            <StyledPrimaryAsyncButton
              disabled={hasError || !isCreditComplete}
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
  emailValue: T.string,
  firstNameValue: T.string,
  fundValue: T.oneOfType([T.number, T.string]),
  handleStripeToken: T.func,
  handleZipChange: T.func,
  hasError: T.bool,
  isCreditPaymentOpen: T.bool,
  issueId: T.string,
  lastNameValue: T.string,
  organizationId: T.string,
  setZipValue: T.func,
  userId: T.string,
  zipValue: T.string,
};

export default CreditCardView;
