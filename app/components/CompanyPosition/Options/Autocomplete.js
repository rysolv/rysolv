import React from 'react';
import T from 'prop-types';

import { Autocomplete } from './styledComponents';

const AutocompleteOption = ({
  handleChangeInput,
  multiple,
  onBlur,
  options,
  value,
}) => {
  const customHandleChangeInput = val => {
    if (multiple) {
      handleChangeInput(val.map(el => el.value));
    } else {
      handleChangeInput(val.value);
    }
  };

  const formattedValue = Array.isArray(value)
    ? value.map(el => ({ value: el }))
    : { value };

  return (
    <Autocomplete
      height="4.9rem"
      multiple={multiple}
      onBlur={onBlur}
      onChange={(e, val) => customHandleChangeInput(val)}
      options={options}
      value={formattedValue}
    />
  );
};

AutocompleteOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  multiple: T.bool.isRequired,
  onBlur: T.func.isRequired,
  options: T.array.isRequired,
  value: T.oneOfType([T.array, T.string]).isRequired,
};

export default AutocompleteOption;
