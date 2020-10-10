import React from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';
import autocompleteDictionary from 'utils/autocompleteDictionary';

const LanguageAutocomplete = ({
  error,
  helperText,
  label,
  onChange,
  type,
  ...restProps
}) => (
  <BaseAutocomplete
    error={error}
    helperText={helperText}
    label={label}
    onChange={onChange}
    options={autocompleteDictionary[type]}
    {...restProps}
  />
);

LanguageAutocomplete.defaultProps = { type: 'language' };

LanguageAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
  type: T.string,
};

export default LanguageAutocomplete;
