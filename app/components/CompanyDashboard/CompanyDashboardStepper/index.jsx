import React from 'react';
import T from 'prop-types';
import StepLabel from '@material-ui/core/StepLabel';

import { steps } from './constants';
import { StyledStep, StyledStepper } from './styledComponents';

const CompanyDashboardStepper = ({ activeStep, hasCandidates }) => (
  <StyledStepper alternativeLabel activeStep={activeStep}>
    {steps.map((label, index) => (
      <StyledStep
        key={label}
        active={activeStep === index}
        completed={activeStep > index && hasCandidates}
        disabled={activeStep < index}
        onClick={() => {}}
      >
        <StepLabel>{label}</StepLabel>
      </StyledStep>
    ))}
  </StyledStepper>
);

CompanyDashboardStepper.propTypes = {
  activeStep: T.number.isRequired,
  hasCandidates: T.bool.isRequired,
};

export default CompanyDashboardStepper;
