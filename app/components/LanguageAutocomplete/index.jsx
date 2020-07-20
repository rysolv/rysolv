import React from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';
import autocompleteDictionary from 'utils/autocompleteDictionary';

const LanguageAutocomplete = ({
  error,
  helperText,
  label,
  onChange,
  ...restProps
}) => (
  <BaseAutocomplete
    error={error}
    helperText={helperText}
    label={label}
    onChange={onChange}
    options={autocompleteDictionary.language}
    {...restProps}
  />
);

LanguageAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
};

export default LanguageAutocomplete;
