import React from 'react';
import T from 'prop-types';

import {
  CompanySettingsContainer,
  CompanySettingsHeader,
} from '../styledComponents';

import {
  PlanContainer,
  PlanHeader,
  PricingSubTitle,
  PricingTitle,
  StyledPrimaryButton,
} from './styledComponents';

const CompanyPayments = ({
  currentPlan,
  dispatchOpenModal,
  handleSelectPlan,
  paymentConfirmed,
}) => (
  <CompanySettingsContainer>
    <CompanySettingsHeader>Payment Method</CompanySettingsHeader>

    <StyledPrimaryButton
      label={paymentConfirmed ? 'Update Payment Method' : 'Add Payment Method'}
      onClick={() => dispatchOpenModal({ modalState: 'payment' })}
    />

    <CompanySettingsHeader>Plan</CompanySettingsHeader>

    <PlanContainer>
      <PlanHeader>
        <PricingTitle>Startup</PricingTitle>
        <PricingSubTitle>Building a team</PricingSubTitle>
      </PlanHeader>
      <StyledPrimaryButton
        label={currentPlan === 'startup' ? 'Current' : 'Select'}
        onClick={() => handleSelectPlan({ plan: 'startup' })}
        selected={currentPlan === 'startup'}
      />
    </PlanContainer>
    <PlanContainer>
      <PlanHeader>
        <PricingTitle>Standard</PricingTitle>
        <PricingSubTitle>Growing companies</PricingSubTitle>
      </PlanHeader>
      <StyledPrimaryButton
        label={currentPlan === 'standard' ? 'Current' : 'Select'}
        onClick={() => handleSelectPlan({ plan: 'standard' })}
        selected={currentPlan === 'standard'}
      />
    </PlanContainer>
    <PlanContainer>
      <PlanHeader>
        <PricingTitle>Enterprise</PricingTitle>
        <PricingSubTitle>Unlimited Hires</PricingSubTitle>
      </PlanHeader>
      <StyledPrimaryButton
        label={currentPlan === 'enterprise' ? 'Current' : 'Select'}
        onClick={() => handleSelectPlan({ plan: 'enterprise' })}
        selected={currentPlan === 'enterprise'}
      />
    </PlanContainer>
  </CompanySettingsContainer>
);

CompanyPayments.propTypes = {
  currentPlan: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  handleSelectPlan: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
};

export default CompanyPayments;
