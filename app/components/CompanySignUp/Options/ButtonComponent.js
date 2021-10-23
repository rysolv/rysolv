/* eslint-disable react/no-array-index-key */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledPrimaryButton } from './styledComponents';

export const SingleButton = ({ dispatchChangeInput, form, id, options }) => {
  const [selected, setSelected] = useState(form[id].value || null);
  useEffect(() => setSelected(form[id].value || null), [id]);

  const handleClick = ({ value }) => {
    const tempValue = selected && selected === value ? '' : value;
    setSelected(tempValue);
    dispatchChangeInput({ field: id, value: tempValue });
  };
  return (
    <Fragment>
      {options.map(({ value }, index) => (
        <StyledPrimaryButton
          key={`option-${index}`}
          isSelected={selected === value}
          label={value}
          onClick={() => handleClick({ value })}
        />
      ))}
    </Fragment>
  );
};

SingleButton.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
};
