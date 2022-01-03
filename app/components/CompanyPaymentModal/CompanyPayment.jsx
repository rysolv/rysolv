import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { BaseRadioButtonGroup, ConditionalRender } from 'components/base_ui';

import ACH from './ACH';
import { stripeError } from './constants';
import CreditCard from './CreditCard';
import PaymentLoadingIndicator from './PaymentLoadingIndicator';
import {
  Asterisk,
  ButtonWrapper,
  DisclaimerWrapper,
  ModalContainer,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const CompanyPaymentModal = ({
  dispatchClearAlerts,
  dispatchFetchPlaidToken,
  dispatchResetModalState,
  dispatchSetModalAlerts,
  dispatchUpdatePaymentMethod,
  handleClose,
  modalAlerts,
  modalLoading,
  paymentConfirmed,
  plaidToken,
}) => {
  const [selectedMethod, setSelectedMethod] = useState('Credit card');
  const [zipCode, setZipCode] = useState('');
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (!plaidToken) dispatchFetchPlaidToken();
    return dispatchResetModalState;
  }, []);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(cardElement, zipCode);

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
      dispatchSetModalAlerts({ error: stripeError });
    }
  };

  return (
    <ModalContainer>
      <ConditionalRender
        Component={
          <Fragment>
            <StyledTitle>
              {paymentConfirmed ? 'Update' : 'Add'} payment method
            </StyledTitle>
            <StyledErrorSuccessBanner
              error={modalAlerts.error}
              onClose={dispatchClearAlerts}
              success={modalAlerts.success}
            />
            <BaseRadioButtonGroup
              handleRadioChange={e => setSelectedMethod(e.target.value)}
              selectedValue={selectedMethod}
              values={['Credit card', 'ACH']}
            />
            <ConditionalRender
              Component={
                <CreditCard setZipCode={setZipCode} zipCode={zipCode} />
              }
              FallbackComponent={
                <ACH
                  dispatchSetModalAlerts={dispatchSetModalAlerts}
                  dispatchUpdatePaymentMethod={dispatchUpdatePaymentMethod}
                  plaidToken={plaidToken}
                />
              }
              shouldRender={selectedMethod === 'Credit card'}
            />
            <ButtonWrapper>
              <StyledPrimaryButton label="Cancel" onClick={handleClose} />
              <ConditionalRender
                Component={
                  <StyledPrimaryAsyncButton
                    disabled={!stripe || !zipCode}
                    label="Save"
                    loading={modalLoading}
                    onClick={handleSubmit}
                  />
                }
                shouldRender={selectedMethod === 'Credit card'}
              />
            </ButtonWrapper>
            <DisclaimerWrapper>
              <Asterisk>*</Asterisk> Payment authorized with&nbsp;
              {selectedMethod === 'Credit card' ? 'Stripe' : 'Plaid'}.
            </DisclaimerWrapper>
          </Fragment>
        }
        FallbackComponent={PaymentLoadingIndicator}
        shouldRender={!modalLoading}
      />
    </ModalContainer>
  );
};

CompanyPaymentModal.propTypes = {
  dispatchClearAlerts: T.func.isRequired,
  dispatchFetchPlaidToken: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
  dispatchSetModalAlerts: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  handleClose: T.func.isRequired,
  modalAlerts: T.object.isRequired,
  modalLoading: T.bool.isRequired,
  paymentConfirmed: T.bool.isRequired,
  plaidToken: T.string,
};

export default CompanyPaymentModal;
