import React from 'react';
import T from 'prop-types';
import Slider from '@material-ui/core/Slider';

const BaseSlider = ({ handleChange, value }) => (
  <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" />
);

BaseSlider.propTypes = {
  handleChange: T.func.isRequired,
  value: T.string.isRequired,
};

export default BaseSlider;
