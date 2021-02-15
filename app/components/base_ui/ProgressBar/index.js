import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';
import {
  ProgressBarWrapper,
  StyledLabel,
  StyledProgressBar,
} from './styledComponents';

const ProgressBar = ({ label, step, steps }) => {
  console.log('step', step, steps, step / steps);
  return (
    <ProgressBarWrapper>
      <div>
        <StyledProgressBar
          activeStep={step}
          classes={{ progress: 'progress' }}
          position="static"
          steps={steps}
          variant="progress"
        />
        <div>{`${Math.round((step / steps) * 100)}%`}</div>
      </div>
      <ConditionalRender
        Component={<StyledLabel>{label}</StyledLabel>}
        shouldRender={!!label}
      />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  label: T.string,
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default ProgressBar;
