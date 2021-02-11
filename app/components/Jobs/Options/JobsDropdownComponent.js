/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledPrimaryButton } from './styledComponents';

const JobsButton = ({ dispatchChangeInput, form, id, options }) => {
  const [selected, setSelected] = useState(form[id].value || null);
  useEffect(() => setSelected(form[id].value || null), [id]);

  const handleClick = ({ value }) => {
    setSelected(value);
    dispatchChangeInput({ field: id, value });
  };
  return (
    <div>
      {options.map(({ label, value }, index) => (
        <StyledPrimaryButton
          key={`option-${index}`}
          isSelected={selected === value}
          label={label}
          onClick={() => handleClick({ value })}
        />
      ))}
    </div>
  );
};

JobsButton.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
};

export default JobsButton;
