import React from 'react';
import T from 'prop-types';

import {
  StyledFormControlLabel,
  StyledRadioButton,
  StyledRadioButtonGroup,
} from './styledComponents';

const RadioButtonComponent = (
  <StyledRadioButton classes={{ checked: 'checked' }} color="primary" />
);

const BaseRadioButtonGroup = ({ handleRadioChange, selectedValue, values }) => (
  <StyledRadioButtonGroup onChange={handleRadioChange} value={selectedValue}>
    {values.map(value => (
      <StyledFormControlLabel
        key={`radio-button-${value}`}
        classes={{ label: 'label' }}
        control={RadioButtonComponent}
        isActive={selectedValue === value}
        label={value}
        value={value}
      />
    ))}
  </StyledRadioButtonGroup>
);

BaseRadioButtonGroup.propTypes = {
  handleRadioChange: T.func.isRequired,
  selectedValue: T.string.isRequired,
  values: T.arrayOf(T.string).isRequired,
};

export default BaseRadioButtonGroup;
