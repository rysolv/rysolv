import React from 'react';
import T from 'prop-types';

import PricingGrid from './PricingGrid';
import {
  PricingContainer,
  PricingHeader,
  PricingSubText,
} from './styledComponents';

const Pricing = ({ handleSelectPlan }) => (
  <PricingContainer>
    <PricingHeader>Pricing plans</PricingHeader>
    <PricingSubText>
      Pick your plan, and you can always change later.
    </PricingSubText>
    <PricingGrid
      buttonText="Get started"
      focus
      handleSelectPlan={handleSelectPlan}
    />
  </PricingContainer>
);

Pricing.propTypes = { handleSelectPlan: T.func.isRequired };

export default Pricing;
