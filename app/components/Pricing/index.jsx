import React from 'react';
import T from 'prop-types';

import PricingGrid from './PricingGrid';
import {
  PricingContainer,
  PricingHeader,
  PricingSubText,
} from './styledComponents';

const Pricing = ({ deviceView, handleSelectPlan }) => (
  <PricingContainer>
    <PricingHeader>Pricing plans</PricingHeader>
    <PricingSubText>
      Pick your plan, and you can always change later.
    </PricingSubText>
    <PricingGrid
      buttonText="Get started"
      deviceView={deviceView}
      focus
      handleSelectPlan={handleSelectPlan}
    />
  </PricingContainer>
);

Pricing.propTypes = {
  deviceView: T.string.isRequired,
  handleSelectPlan: T.func.isRequired,
};

export default Pricing;
