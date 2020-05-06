import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import { StyledSlider } from './styledComponents';

const BaseSlider = ({ handleChange, min, max, value: currValue }) => {
  const marks = [
    {
      value: min,
      label: formatDollarAmount(min, true),
    },
    {
      value: max,
      label: formatDollarAmount(max, true),
    },
  ];
  return (
    <StyledSlider
      classes={{ markLabel: 'markLabel' }}
      defaultValue={0}
      marks={marks}
      max={max}
      min={min}
      onChange={handleChange}
      value={currValue}
      valueLabelDisplay="auto"
    />
  );
};

BaseSlider.defaultProps = { max: 1000, min: 0 };

BaseSlider.propTypes = {
  handleChange: T.func.isRequired,
  max: T.number,
  min: T.number,
  value: T.string.isRequired,
};

export default BaseSlider;
