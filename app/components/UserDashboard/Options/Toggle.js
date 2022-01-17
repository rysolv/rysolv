import React from 'react';
import T from 'prop-types';
import Switch from '@material-ui/core/Switch';

const ToggleOption = ({ handleChangeInput, value }) => (
  <Switch
    checked={value === 'active'}
    color="primary"
    onChange={(e, val) => handleChangeInput(val)}
  />
);

ToggleOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  value: T.string.isRequired,
};

export default ToggleOption;
