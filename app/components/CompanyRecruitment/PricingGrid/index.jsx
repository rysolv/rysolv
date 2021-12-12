import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  BulletTextWrapper,
  BulletWraper,
  ButtonWrapper,
  ColumnWrapper,
  IconWrapper,
  PricingBody,
  PricingGridContainer,
  PricingHeader,
  PricingSubTitle,
  PricingTitle,
  StyledBullets,
  StyledCost,
  StyledCostWrapper,
  StyledDollarSign,
  StyledInterval,
  StyledPrimaryButton,
  StyledSubtext,
} from './styledComponents';

const CheckIcon = iconDictionary('check');

const PricingGrid = ({ buttonText, deviceView, handleSelectPlan }) => {
  const isMobile = [
    'tablet',
    'mobile',
    'mobileS',
    'mobileXS',
    'mobileXXS',
  ].includes(deviceView);

  return (
    <PricingGridContainer>
      {/* STARTUP */}
      <ColumnWrapper>
        <PricingHeader>
          <PricingTitle>Startup</PricingTitle>
          <PricingSubTitle>Building a team</PricingSubTitle>
        </PricingHeader>
        <PricingBody>
          <BulletWraper>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper>
              <BulletTextWrapper>Create positions for free</BulletTextWrapper>
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Get matched with candidates
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Only pay after hiring
            </StyledBullets>
          </BulletWraper>
          <ButtonWrapper>
            <StyledCostWrapper>
              <StyledCost>10%</StyledCost>
              <StyledInterval>starting salary</StyledInterval>
            </StyledCostWrapper>
            <StyledPrimaryButton
              label={buttonText}
              onClick={() => handleSelectPlan({ plan: 'startup' })}
            />
            <StyledSubtext>Terms &amp; Conditions Apply</StyledSubtext>
          </ButtonWrapper>
        </PricingBody>
      </ColumnWrapper>

      {/* STANDARD */}
      <ColumnWrapper focus={!isMobile}>
        <PricingHeader focus={!isMobile}>
          <PricingTitle>Standard</PricingTitle>
          <PricingSubTitle>Growing companies</PricingSubTitle>
        </PricingHeader>
        <PricingBody>
          <BulletWraper>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> 0% placement fee
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Full candidate profiles
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Match with new candidates
              first
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Up to 25 hires per year
            </StyledBullets>
          </BulletWraper>
          <ButtonWrapper>
            <StyledCostWrapper>
              <StyledDollarSign>$</StyledDollarSign>
              <StyledCost>2,495</StyledCost>
              <StyledInterval>/ month</StyledInterval>
            </StyledCostWrapper>
            <StyledPrimaryButton
              label={buttonText}
              onClick={() => handleSelectPlan({ plan: 'standard' })}
            />
            <StyledSubtext>Terms &amp; Conditions Apply</StyledSubtext>
          </ButtonWrapper>
        </PricingBody>
      </ColumnWrapper>

      {/* ENTERPRISE */}
      <ColumnWrapper>
        <PricingHeader>
          <PricingTitle>Enterprise</PricingTitle>
          <PricingSubTitle>Unlimited Hires</PricingSubTitle>
        </PricingHeader>
        <PricingBody>
          <BulletWraper>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> 0% placement fee
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Access to vetted candidates
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Priority support
            </StyledBullets>
            <StyledBullets>
              <IconWrapper>{CheckIcon}</IconWrapper> Tailored candidate
              interviews
            </StyledBullets>
          </BulletWraper>
          <ButtonWrapper>
            <StyledCostWrapper>
              <StyledDollarSign>$</StyledDollarSign>
              <StyledCost>4,950</StyledCost>
              <StyledInterval>/ month</StyledInterval>
            </StyledCostWrapper>
            <StyledPrimaryButton
              label={buttonText}
              onClick={() => handleSelectPlan({ plan: 'enterprise' })}
            />
            <StyledSubtext>Terms &amp; Conditions Apply</StyledSubtext>
          </ButtonWrapper>
        </PricingBody>
      </ColumnWrapper>
    </PricingGridContainer>
  );
};

PricingGrid.propTypes = {
  buttonText: T.string.isRequired,
  deviceView: T.string.isRequired,
  handleSelectPlan: T.func.isRequired,
};

export default PricingGrid;
