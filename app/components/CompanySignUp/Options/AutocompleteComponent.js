import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledBaseAutocomplete } from './styledComponents';

const Autocomplete = ({
  dispatchChangeInput,
  form,
  id,
  limit,
  options,
  placeholder,
}) => {
  const [selected, setSelected] = useState(form[id].value || []);
  useEffect(() => {
    setSelected(form[id].value || []);
  }, [id]);

  const handleChange = value => {
    if (value.length > limit) {
      value.splice(2, 1);
      const formattedValue = value.map(el => el.value);
      setSelected(value);
      dispatchChangeInput({ field: id, value: formattedValue });
    } else {
      const formattedValue = value.map(el => el.value);
      setSelected(value);
      dispatchChangeInput({ field: id, value: formattedValue });
    }
  };
  return (
    <StyledBaseAutocomplete
      key={id}
      multiple
      onChange={(e, value) => handleChange(value)}
      options={options}
      placeholder={placeholder}
      value={selected.map(el => ({ value: el.value || el }))}
    />
  );
};

Autocomplete.defaultProps = { limit: 2 };

Autocomplete.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
  placeholder: T.string,
};

export default Autocomplete;
