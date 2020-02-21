import React from 'react';
import T from 'prop-types';
import StyledBaseInput from './styledComponents';

const BaseInput = ({
  disabled,
  label,
  onChange,
  required,
  type,
  value,
  ...restProp
}) => (
  <div>
    <StyledBaseInput
      classes={{ focused: 'focused', root: 'input' }}
      disabled={disabled}
      onChange={onChange}
      required={required}
      type={type}
      value={value}
      {...restProp}
    />
  </div>
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
