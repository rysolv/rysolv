import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import PricingGrid from 'components/Pricing/PricingGrid';

import {
  CurrentPaymentMethod,
  PaymentContainer,
  PaymentLabel,
  PaymentLabelWrapper,
  StyledButton,
  HorizontalDivider,
} from './styledComponents';
import {
  CompanySettingsContainer,
  CompanySettingsHeader,
} from '../styledComponents';

const CompanyPayments = ({
  currentPlan,
  dispatchOpenModal,
  handleSelectPlan,
  paymentConfirmed,
  paymentMethod,
}) => (
  <CompanySettingsContainer>
    <CompanySettingsHeader>Payments &amp; Subscription</CompanySettingsHeader>
    <PaymentContainer $isFirst>
      <PaymentLabelWrapper>
        <PaymentLabel>Payment Method</PaymentLabel>
        <StyledButton
          disableRipple
          onClick={() => dispatchOpenModal({ modalState: 'payment' })}
        >
          {paymentConfirmed ? 'Edit payment method' : 'Add payment method'}
        </StyledButton>
      </PaymentLabelWrapper>
      <HorizontalDivider />
      <ConditionalRender
        Component={<CurrentPaymentMethod>{paymentMethod}</CurrentPaymentMethod>}
        FallbackComponent={
          <CurrentPaymentMethod $isCentered>
            No payment method added.
          </CurrentPaymentMethod>
        }
        shouldRender={paymentConfirmed}
      />
    </PaymentContainer>
    <PaymentContainer>
      <PaymentLabelWrapper>
        <PaymentLabel>Invoices</PaymentLabel>
      </PaymentLabelWrapper>
      <HorizontalDivider />
      <CurrentPaymentMethod $isCentered>
        No charges have been posted to your account.
      </CurrentPaymentMethod>
    </PaymentContainer>
    <PaymentContainer>
      <PaymentLabelWrapper>
        <PaymentLabel>Subscription</PaymentLabel>
      </PaymentLabelWrapper>
      <HorizontalDivider />
      <PricingGrid
        buttonText="Upgrade"
        currentPlan={currentPlan}
        handleSelectPlan={handleSelectPlan}
        isSettingRoute
      />
    </PaymentContainer>
  </CompanySettingsContainer>
);

CompanyPayments.propTypes = {
  currentPlan: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  handleSelectPlan: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
  paymentMethod: T.string.isRequired,
};

export default CompanyPayments;
