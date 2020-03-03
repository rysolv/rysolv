import React from 'react';
import T from 'prop-types';

import BaseTextInput from './BaseTextInput';
import { Spacer, StyledFormControl } from './styledComponents';

const MainTextInput = ({
  disabled,
  error,
  helperText,
  label,
  onChange,
  required,
  value,
  ...restProps
}) => (
  <StyledFormControl>
    {label}
    <BaseTextInput
      classes={{ root: 'formControl' }}
      error={error}
      helperText={helperText}
      InputProps={{
        classes: {
          root: 'base-input',
          underline: 'underline',
        },
      }}
      InputLabelProps={{
        classes: {
          focused: 'focused',
          root: 'label',
        },
        required: false,
      }}
      onChange={onChange}
      required={required}
      value={value}
      {...restProps}
    />
    <Spacer />
  </StyledFormControl>
);

MainTextInput.propTypes = {
  disabled: T.bool,
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
  required: T.bool,
  value: T.oneOfType([T.number, T.string]),
};

export default MainTextInput;
