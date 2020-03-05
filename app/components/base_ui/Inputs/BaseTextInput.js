import React from 'react';
import T from 'prop-types';

import { StyledBaseTextInput } from './styledComponents';

const BaseTextInput = ({
  disabled,
  error,
  helperText,
  InputProps,
  onChange,
  required,
  value,
  ...restProps
}) => (
  <StyledBaseTextInput
    classes={{ root: 'formControl' }}
    disabled={disabled}
    error={error}
    helperText={helperText}
    onChange={onChange}
    required={required}
    value={value}
    InputProps={{
      classes: {
        root: 'base-input',
        underline: 'underline',
      },
      ...InputProps,
    }}
    InputLabelProps={{
      classes: {
        focused: 'focused',
        root: 'label',
      },
      required: false,
    }}
    {...restProps}
  />
);

BaseTextInput.propTypes = {
  disabled: T.bool,
  error: T.bool,
  helperText: T.string,
  InputProps: T.object,
  onChange: T.func.isRequired,
  required: T.bool,
  value: T.oneOfType([T.number, T.string]),
};

export default BaseTextInput;
