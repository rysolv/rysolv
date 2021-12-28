import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import AsyncRender from 'components/AsyncRender';

import CreditCardView from './CreditCardView';
import LoadingIndicator from './PaymentLoadingIndicator';
import PlaidLink from './PlaidLink';

import {
  ButtonGroup,
  ContentGroup,
  DetailText,
  HorizontalDivider,
  PaymentSelector,
  StyledButton,
  Title,
  ViewContainer,
} from './styledComponents';

const CompanyPaymentModal = ({
  dispatchFetchPlaidToken,
  dispatchUpdatePaymentMethod,
  handleClose,
  modalLoading,
  paymentConfirmed,
  plaidToken,
  setPlaidError,
  setStripeError,
}) => {
  const [method, setMethod] = useState('card');

  useEffect(() => {
    if (!plaidToken) dispatchFetchPlaidToken();
  }, []);

  return (
    <ViewContainer>
      <ConditionalRender
        Component={
          <>
            <Title>{paymentConfirmed ? 'Update' : 'Add'} Payment Method</Title>
            <HorizontalDivider />

            <PaymentSelector>
              <StyledButton
                disableRipple
                onClick={() => setMethod('card')}
                selected={method === 'card'}
              >
                Credit Card
              </StyledButton>
              <StyledButton
                disableRipple
                onClick={() => setMethod('ach')}
                selected={method === 'ach'}
              >
                ACH
              </StyledButton>
            </PaymentSelector>

            <ContentGroup>
              <ConditionalRender
                Component={
                  <CreditCardView
                    dispatchUpdatePaymentMethod={dispatchUpdatePaymentMethod}
                    setStripeError={setStripeError}
                  />
                }
                FallbackComponent={
                  <div>
                    <AsyncRender
                      asyncData={plaidToken}
                      component={PlaidLink}
                      propsToPassDown={{
                        dispatchUpdatePaymentMethod,
                        plaidToken,
                        setPlaidError,
                      }}
                    />
                    <DetailText>Payment authoized with Plaid</DetailText>
                  </div>
                }
                shouldRender={method === 'card'}
              />
            </ContentGroup>

            <ButtonGroup>
              <StyledButton disableRipple onClick={() => handleClose()}>
                Cancel
              </StyledButton>
            </ButtonGroup>
          </>
        }
        FallbackComponent={<LoadingIndicator />}
        shouldRender={!modalLoading}
      />
    </ViewContainer>
  );
};

CompanyPaymentModal.propTypes = {
  dispatchFetchPlaidToken: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  handleClose: T.func.isRequired,
  modalLoading: T.bool.isRequired,
  paymentConfirmed: T.bool.isRequired,
  plaidToken: T.string,
  setPlaidError: T.func.isRequired,
  setStripeError: T.func.isRequired,
};

export default CompanyPaymentModal;
