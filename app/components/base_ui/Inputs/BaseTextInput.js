import React, { Fragment } from 'react';
import T from 'prop-types';
import { StyledBaseTextInput } from './styledComponents';

const BaseTextInput = ({
  disabled,
  error,
  FormHelperTextProps,
  helperText,
  name,
  onBlur,
  onChange,
  required,
  type,
  value,
  ...restProps
}) => (
  <Fragment>
    <StyledBaseTextInput
      classes={{ root: 'formControl' }}
      disabled={disabled}
      error={error}
      FormHelperTextProps={{
        classes: { root: 'helper' },
        ...FormHelperTextProps,
      }}
      helperText={helperText}
      InputProps={{
        classes: {
          focused: 'focused',
          input: 'input',
          root: 'base-input',
        },
      }}
      margin="normal"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      required={required}
      type={type}
      value={value}
      {...restProps}
    />
  </Fragment>
);

BaseTextInput.defaultProps = {
  disabled: false,
  error: null,
  helperText: null,
  required: false,
  type: 'text',
  value: null,
};

BaseTextInput.propTypes = {
  disabled: T.bool,
  error: T.oneOfType([T.string, T.oneOf([null]), T.bool]),
  FormHelperTextProps: T.object,
  helperText: T.oneOfType([T.string, T.oneOf([null])]),
  name: T.string,
  onBlur: T.func,
  onChange: T.func.isRequired,
  required: T.bool,
  type: T.string,
  value: T.oneOfType([T.number, T.string]),
};

export default BaseTextInput;
