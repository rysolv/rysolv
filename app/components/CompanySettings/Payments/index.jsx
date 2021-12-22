import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import PricingGrid from 'components/CompanyRecruitment/PricingGrid';

import {
  CompanySettingsContainer,
  CompanySettingsHeader,
  HorizontalDivider,
  SettingsLabel,
  SettingsLabelContainer,
  StyledButton,
} from '../styledComponents';

import { CurrentPaymentMethod } from './styledComponents';

const CompanyPayments = ({
  currentPlan,
  dispatchOpenModal,
  handleSelectPlan,
  paymentConfirmed,
}) => (
  <CompanySettingsContainer>
    <CompanySettingsHeader>Payments &amp; Subscription</CompanySettingsHeader>

    <SettingsLabelContainer>
      <SettingsLabel>Payment Method</SettingsLabel>
      <StyledButton
        disableRipple
        onClick={() => dispatchOpenModal({ modalState: 'payment' })}
      >
        {paymentConfirmed ? 'Update Payment Method' : 'Add Payment Method'}
      </StyledButton>
    </SettingsLabelContainer>
    <HorizontalDivider />

    <ConditionalRender
      Component={
        <CurrentPaymentMethod>
          Wells Fargo Account ending in XX8115
        </CurrentPaymentMethod>
      }
      FallbackComponent={
        <CurrentPaymentMethod>No payment method selected</CurrentPaymentMethod>
      }
      shouldRender={paymentConfirmed}
    />

    <SettingsLabelContainer>
      <SettingsLabel>Subscription</SettingsLabel>
    </SettingsLabelContainer>
    <HorizontalDivider />

    <PricingGrid
      buttonText="Upgrade"
      currentPlan={currentPlan}
      handleSelectPlan={handleSelectPlan}
    />

    <SettingsLabelContainer>
      <SettingsLabel>Invoices</SettingsLabel>
    </SettingsLabelContainer>
    <HorizontalDivider />
    <CurrentPaymentMethod>
      No charges have been posted to your account
    </CurrentPaymentMethod>
  </CompanySettingsContainer>
);

CompanyPayments.propTypes = {
  currentPlan: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  handleSelectPlan: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
};

export default CompanyPayments;
