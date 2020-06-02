import React from 'react';
import T from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxComponent = ({ checked, disabled, onChange, ...restProps }) => (
  <Checkbox
    checked={checked}
    classes={{ checked: 'checked', root: 'checkbox' }}
    color="default"
    disabled={disabled}
    onChange={onChange}
    {...restProps}
  />
);

Checkbox.defaultProps = { disabled: false };

CheckboxComponent.propTypes = {
  checked: T.bool.isRequired,
  disabled: T.bool,
  onChange: T.func.isRequired,
};

export default CheckboxComponent;
