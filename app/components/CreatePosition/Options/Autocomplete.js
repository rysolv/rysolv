import React from 'react';
import T from 'prop-types';

import {
  Autocomplete,
  OptionError,
  OptionLabel,
  OptionWrapper,
} from './styledComponents';

const AutocompleteOption = ({
  error,
  label,
  onBlur,
  onChange,
  options,
  value,
}) => (
  <OptionWrapper>
    <OptionLabel>{label}</OptionLabel>
    <Autocomplete
      height="4.9rem"
      multiple={false}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      value={value}
    />
    <OptionError>{error}</OptionError>
  </OptionWrapper>
);

AutocompleteOption.propTypes = {
  error: T.oneOfType([T.bool, T.string]).isRequired,
  label: T.string.isRequired,
  onBlur: T.func.isRequired,
  onChange: T.func.isRequired,
  options: T.array.isRequired,
  value: T.string.isRequired,
};

export default AutocompleteOption;
