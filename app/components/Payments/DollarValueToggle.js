import React from 'react';
import T from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { dollarValues } from './constants';
import { StyledToggleButtonGroup } from './styledComponents';

const DollarValueToggle = ({ fundAmount, handleChange }) => (
  <div>
    <StyledToggleButtonGroup
      classes={{ grouped: 'grouped' }}
      exclusive
      value={fundAmount}
      onChange={handleChange}
    >
      {dollarValues.map(value => (
        <ToggleButton key={`toggle-${value}`} value={value}>
          ${value}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  </div>
);

DollarValueToggle.propTypes = {
  fundAmount: T.string,
  handleChange: T.func,
};

export default DollarValueToggle;
