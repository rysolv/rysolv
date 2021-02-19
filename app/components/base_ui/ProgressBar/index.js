import React from 'react';
import T from 'prop-types';

import {
  ProgressBarWrapper,
  StyledLabel,
  StyledProgressBar,
} from './styledComponents';

const ProgressBar = ({ step, steps }) => (
  <ProgressBarWrapper>
    <StyledProgressBar
      activeStep={step}
      classes={{ progress: 'progress' }}
      position="static"
      steps={steps + 1}
      variant="progress"
    />
    <StyledLabel>{`${Math.round((step / steps) * 100)}%`}</StyledLabel>
  </ProgressBarWrapper>
);

ProgressBar.propTypes = {
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default ProgressBar;
