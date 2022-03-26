import React from 'react';
import T from 'prop-types';

import PricingGrid from './PricingGrid';
import {
  PricingContainer,
  PricingHeader,
  PricingSubText,
} from './styledComponents';

const Pricing = ({ handleNav, handleSelectPlan }) => (
  <PricingContainer>
    <PricingHeader>Pricing plans</PricingHeader>
    <PricingSubText>
      Pick your plan, and you can always change later.
    </PricingSubText>
    <PricingGrid
      buttonText="Get started"
      focus
      handleNav={handleNav}
      handleSelectPlan={handleSelectPlan}
    />
  </PricingContainer>
);

Pricing.propTypes = {
  handleNav: T.func.isRequired,
  handleSelectPlan: T.func.isRequired,
};

export default Pricing;
