import React from 'react';
import T from 'prop-types';

import { StyledBaseTextInput } from './styledComponents';

const BaseTextInput = ({ disabled, onChange, type, value, ...restProps }) => (
  <StyledBaseTextInput
    classes={{ root: 'formControl' }}
    disabled={disabled}
    FormHelperTextProps={{ classes: { root: 'helperText' } }}
    InputProps={{
      classes: {
        root: 'base-input',
      },
    }}
    InputLabelProps={{
      classes: {
        focused: 'focused',
        root: 'label',
        shrink: 'shrink',
      },
    }}
    onChange={onChange}
    type={type}
    value={value}
    {...restProps}
  />
);

BaseTextInput.defaultProps = {
  disabled: false,
  type: 'text',
};

BaseTextInput.propTypes = {
  disabled: T.bool,
  onChange: T.func,
  type: T.string,
  value: T.oneOfType([T.number, T.string]),
};

export default BaseTextInput;
