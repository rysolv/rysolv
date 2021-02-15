/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { BaseAutocomplete } from 'components/base_ui';

import autocompleteDictionary from 'utils/autocompleteDictionary';

const JobsAutocomplete = ({ dispatchChangeInput, form, id }) => {
  const [selected, setSelected] = useState(form[id].value || []);
  useEffect(() => {
    setSelected(form[id].value || []);
  }, [id]);

  const handleChange = el => {
    const { value = '' } = el || {};
    setSelected(value);
    dispatchChangeInput({ field: id, value });
  };
  const additionalProps =
    id === 'language'
      ? {
        multiple: true,
        value: selected.map(el => ({
          value: el.value,
        })),
      }
      : {};
  return (
    <div key={id}>
      <BaseAutocomplete
        multiple={false}
        onChange={(e, value) => handleChange(value)}
        options={autocompleteDictionary[id]}
        value={selected.value}
        {...additionalProps}
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
