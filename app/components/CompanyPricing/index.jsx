import React, { Fragment } from 'react';
import T from 'prop-types';

import PricingGrid from './PricingGrid';
import {
  CompanyPricingContainer,
  CompanyPricingHeader,
} from './styledComponents';

const CompanyPricing = ({
  deviceView,

  handleSelectPlan,
}) => (
  <Fragment>
    <CompanyPricingContainer>
      <CompanyPricingHeader> Pricing!</CompanyPricingHeader>
      <PricingGrid
        buttonText="Get Started"
        deviceView={deviceView}
        focus
        handleSelectPlan={handleSelectPlan}
      />
    </CompanyPricingContainer>
  </Fragment>
);

CompanyPricing.propTypes = {
  deviceView: T.string.isRequired,

  handleSelectPlan: T.func.isRequired,
};

export default CompanyPricing;
