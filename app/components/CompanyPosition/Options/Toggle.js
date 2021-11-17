import React from 'react';
import T from 'prop-types';
import Switch from '@material-ui/core/Switch';

const ToggleOption = ({ handleChangeInput, value }) => (
  <Switch
    checked={value === 'Yes'}
    color="primary"
    onChange={(e, val) => handleChangeInput(val ? 'Yes' : 'No')}
  />
);

ToggleOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  value: T.string.isRequired,
};

export default ToggleOption;
