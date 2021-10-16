import React from 'react';
import T from 'prop-types';

import { Autocomplete } from './styledComponents';

const AutocompleteOption = ({ handleChangeInput, onBlur, options, value }) => (
  <Autocomplete
    height="4.9rem"
    multiple={false}
    onBlur={onBlur}
    onChange={(e, el) => handleChangeInput(el.value)}
    options={options}
    value={{ value }}
  />
);

AutocompleteOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  options: T.array.isRequired,
  value: T.string.isRequired,
};

export default AutocompleteOption;
