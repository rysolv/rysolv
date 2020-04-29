import React from 'react';
import T from 'prop-types';
import { StyledBaseInput } from './styledComponents';

const BaseInput = ({
  disabled,
  label,
  onChange,
  required,
  type,
  value,
  ...restProp
}) => (
  <StyledBaseInput
    classes={{
      adornedStart: 'adornedStart',
      focused: 'focused',
      input: 'input',
    }}
    disabled={disabled}
    onChange={onChange}
    required={required}
    type={type}
    value={value}
    {...restProp}
  />
);

BaseInput.propTypes = {
  disabled: T.bool,
  label: T.string,
  onChange: T.func,
  required: T.bool,
  type: T.string,
  value: T.oneOfType([T.string, T.number, T.bool]),
};

export default BaseInput;
