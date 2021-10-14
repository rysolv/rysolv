import React from 'react';
import T from 'prop-types';

import {
  Input,
  OptionError,
  OptionLabel,
  OptionWrapper,
} from './styledComponents';

const InputOption = ({ error, label, onBlur, onChange, value }) => (
  <OptionWrapper>
    <OptionLabel>{label}</OptionLabel>
    <Input
      height="4.9rem"
      onBlur={onBlur}
      onChange={onChange}
      type="text"
      value={value}
    />
    <OptionError>{error}</OptionError>
  </OptionWrapper>
);

InputOption.propTypes = {
  error: T.oneOfType([T.bool, T.string]).isRequired,
  label: T.string.isRequired,
  onBlur: T.func.isRequired,
  onChange: T.func.isRequired,
  value: T.string.isRequired,
};

export default InputOption;
