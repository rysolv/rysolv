import React, { Fragment } from 'react';
import T from 'prop-types';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';

import {
  HorizontalWrapper,
  Input,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledStripeInput,
} from './styledComponents';

const CreditCard = ({ setZipCode, zipCode }) => (
  <Fragment>
    <OptionWrapper>
      <OptionLabel>Credit card number</OptionLabel>
      <StyledStripeInput component={CardNumberElement} />
    </OptionWrapper>
    <HorizontalWrapper>
      <OptionWrapper width="49%">
        <OptionLabel>Expiration date</OptionLabel>
        <StyledStripeInput component={CardExpiryElement} />
      </OptionWrapper>
      <OptionWrapper width="49%">
        <OptionLabel>CVC</OptionLabel>
        <StyledStripeInput component={CardCvcElement} />
      </OptionWrapper>
    </HorizontalWrapper>
    <OptionWrapper width="49%">
      <OptionLabel>Zip code</OptionLabel>
      <Input
        height="4.9rem"
        onChange={e => setZipCode(e.target.value)}
        placeholder="12345"
        type="text"
        value={zipCode}
      />
      <OptionError />
    </OptionWrapper>
  </Fragment>
);

CreditCard.propTypes = {
  setZipCode: T.func.isRequired,
  zipCode: T.string.isRequired,
};

export default CreditCard;
