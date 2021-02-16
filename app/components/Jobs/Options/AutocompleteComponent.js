import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';

const Autocomplete = ({ dispatchChangeInput, form, id, options }) => {
  const [selected, setSelected] = useState(form[id].value || []);
  useEffect(() => {
    setSelected(form[id].value || []);
  }, [id]);

  const handleChange = el => {
    const { value = '' } = el || {};
    setSelected(value);
    dispatchChangeInput({ field: id, value });
  };
  return (
    <div key={id}>
      <BaseAutocomplete
        multiple={false}
        onChange={(e, value) => handleChange(value)}
        options={options}
        value={selected.value}
      />
    </div>
  );
};

Autocomplete.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
};

export default Autocomplete;
