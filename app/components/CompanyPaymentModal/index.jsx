import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender, ErrorSuccessBanner } from 'components/base_ui';
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
  dispatchClearAlerts,
  dispatchFetchPlaidToken,
  dispatchSetModalError,
  dispatchUpdatePaymentMethod,
  handleClose,
  modalError: { error, success },
  modalLoading,
  paymentConfirmed,
  plaidToken,
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
            <ErrorSuccessBanner
              bottomMarginRequired="1rem"
              error={error}
              onClose={dispatchClearAlerts}
              success={success}
              topMarginRequired="1rem"
            />
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
                    dispatchSetModalError={dispatchSetModalError}
                    dispatchUpdatePaymentMethod={dispatchUpdatePaymentMethod}
                  />
                }
                FallbackComponent={
                  <div>
                    <AsyncRender
                      asyncData={plaidToken}
                      component={PlaidLink}
                      propsToPassDown={{
                        dispatchSetModalError,
                        dispatchUpdatePaymentMethod,
                        plaidToken,
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
  dispatchClearAlerts: T.func.isRequired,
  dispatchFetchPlaidToken: T.func.isRequired,
  dispatchSetModalError: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  handleClose: T.func.isRequired,
  modalError: T.object.isRequired,
  modalLoading: T.bool.isRequired,
  paymentConfirmed: T.bool.isRequired,
  plaidToken: T.string,
};

export default CompanyPaymentModal;
