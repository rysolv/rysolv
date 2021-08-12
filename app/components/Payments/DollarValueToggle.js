import React from 'react';
import T from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { dollarValues } from './constants';
import { StyledToggleButtonGroup } from './styledComponents';

const DollarValueToggle = ({ fundValue, handleChange }) => (
  <div>
    <StyledToggleButtonGroup
      classes={{ grouped: 'grouped' }}
      exclusive
      value={fundValue}
    >
      {dollarValues.map(value => (
        <ToggleButton
          key={`toggle-${value}`}
          classes={{ root: 'button', selected: 'selected' }}
          onClick={e => handleChange(e, value)}
          value={value}
        >
          ${value}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  </div>
);

DollarValueToggle.propTypes = {
  fundValue: T.oneOfType([T.number, T.string]),
  handleChange: T.func,
};

export default DollarValueToggle;
