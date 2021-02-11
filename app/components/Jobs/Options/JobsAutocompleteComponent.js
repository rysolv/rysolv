/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';

import autocompleteDictionary from 'utils/autocompleteDictionary';

const JobsAutocomplete = ({ dispatchChangeInput, form, id }) => {
  const [selected, setSelected] = useState(form[id].value || []);
  useEffect(() => setSelected(form[id].value || []), [id]);

  const handleChange = ({ value }) => {
    setSelected(value);
    dispatchChangeInput({ field: id, value });
  };
  return (
    <div>
      <BaseAutocomplete
        onChange={(e, value) => handleChange({ value })}
        options={autocompleteDictionary[id]}
        value={selected.map(el => ({
          value: el,
        }))}
      />
    </div>
  );
};

JobsAutocomplete.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
};

export default JobsAutocomplete;
