import React from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';

import { options } from './constants';

const LanguageAutocomplete = ({ error, helperText, label, onChange }) => (
  <BaseAutocomplete
    error={error}
    helperText={helperText}
    label={label}
    onChange={onChange}
    options={options}
  />
);

LanguageAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
};

export default LanguageAutocomplete;
