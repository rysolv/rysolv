import React from 'react';
import T from 'prop-types';

import { Autocomplete } from '../styledComponents';

const AutocompleteOption = ({
  form,
  handleChangeInput,
  handleValidateInput,
  id,
  limit,
  multiple,
  options,
}) => {
  const customHandleChangeInput = val => {
    if (multiple) {
      if (val.length > limit) {
        val.splice(2, 1);
        const formattedValue = val.map(el => el.value);
        handleChangeInput(formattedValue);
      } else {
        const formattedValue = val.map(el => el.value);
        handleChangeInput(formattedValue);
      }
    } else {
      handleChangeInput(val.value);
    }
  };

  const formattedValue = Array.isArray(form[id])
    ? form[id].map(el => ({ value: el }))
    : { value: form[id] };

  return (
    <Autocomplete
      height="4.9rem"
      multiple={multiple}
      onBlur={() =>
        handleValidateInput({
          field: id,
          formType: 'application',
          values: form,
        })
      }
      onChange={(e, val) => customHandleChangeInput(val)}
      options={options}
      value={formattedValue}
    />
  );
};

AutocompleteOption.defaultProps = { limit: 3, multiple: false };

AutocompleteOption.propTypes = {
  form: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  multiple: T.bool,
  options: T.array.isRequired,
};

export default AutocompleteOption;
