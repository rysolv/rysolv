import React from 'react';
import T from 'prop-types';

import {
  OptionError,
  OptionLabel,
  OptionWrapper,
  Textarea,
} from './styledComponents';

const TextareaOption = ({ error, label, onBlur, onChange, value }) => (
  <OptionWrapper>
    <OptionLabel>{label}</OptionLabel>
    <Textarea
      height="12.3rem"
      onBlur={onBlur}
      onChange={onChange}
      type="text"
      value={value}
    />
    <OptionError>{error}</OptionError>
  </OptionWrapper>
);

TextareaOption.propTypes = {
  error: T.oneOfType([T.bool, T.string]).isRequired,
  label: T.string.isRequired,
  onBlur: T.func.isRequired,
  onChange: T.func.isRequired,
  value: T.string.isRequired,
};

export default TextareaOption;
