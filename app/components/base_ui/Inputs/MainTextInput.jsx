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
  type,
  value,
  ...restProps
}) => (
  <StyledFormControl>
    <BaseTextInput
      disabled={disabled}
      error={error}
      helperText={helperText}
      label={label}
      onChange={onChange}
      type={type}
      value={value}
      {...restProps}
    />
    <Spacer />
  </StyledFormControl>
);

MainTextInput.defaultProps = { disabled: false };

MainTextInput.propTypes = {
  disabled: T.bool,
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func,
  type: T.string,
  value: T.oneOfType([T.number, T.string]),
};

export default MainTextInput;
