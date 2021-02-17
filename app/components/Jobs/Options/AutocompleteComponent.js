import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledBaseAutocomplete } from '../styledComponents';

const Autocomplete = ({ dispatchChangeInput, form, id, limit, options }) => {
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
    <div key={id}>
      <StyledBaseAutocomplete
        multiple
        onChange={(e, value) => handleChange(value)}
        options={options}
        value={selected.value}
      />
    </div>
  );
};

Autocomplete.defaultProps = { limit: 2 };

Autocomplete.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
};

export default Autocomplete;
