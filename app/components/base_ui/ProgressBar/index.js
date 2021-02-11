import React from 'react';
import T from 'prop-types';

import {
  ProgressBarWrapper,
  StyledLabel,
  StyledProgressBar,
} from './styledComponents';

const ProgressBar = ({ label, step, steps }) => (
  <ProgressBarWrapper>
    <StyledProgressBar
      activeStep={step}
      classes={{ progress: 'progress' }}
      position="static"
      steps={steps}
      variant="progress"
    />
    <StyledLabel>{label}</StyledLabel>
  </ProgressBarWrapper>
);

ProgressBar.propTypes = {
  label: T.string,
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default ProgressBar;
