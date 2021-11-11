import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../../ConditionalRender';
import {
  Input,
  InputContainer,
  InputError,
  InputLabel,
  InputWrapper,
} from './styledComponents';

const TextInput = ({
  Adornment,
  error,
  onBlur,
  onChange,
  label,
  value,
  ...restProps
}) => (
  <InputContainer>
    <InputLabel>{label}</InputLabel>
    <InputWrapper>
      <Input
        height="4.9rem"
        onBlur={onBlur}
        onChange={onChange}
        type="text"
        value={value}
        {...restProps}
      />
      <ConditionalRender Component={Adornment} shouldRender={!!Adornment} />
    </InputWrapper>
    <ConditionalRender
      Component={<InputError>{error}</InputError>}
      shouldRender={!!error}
    />
  </InputContainer>
);

TextInput.propTypes = {
  Adornment: T.elementType,
  error: T.string.isRequired,
  label: T.string.isRequired,
  onBlur: T.func.isRequired,
  onChange: T.func.isRequired,
  value: T.string.isRequired,
};

export default TextInput;
