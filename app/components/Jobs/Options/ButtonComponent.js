/* eslint-disable react/no-array-index-key */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledPrimaryButton } from '../styledComponents';

export const MultipleButton = ({
  dispatchChangeInput,
  form,
  id,
  limit,
  options,
}) => {
  const handleClick = ({ value }) => {
    const tempValue = [...form[id].value];
    if (tempValue.length < limit && !tempValue.includes(value)) {
      tempValue.push(value);
    } else if (tempValue.length === limit && !tempValue.includes(value)) {
      tempValue.pop();
      tempValue.push(value);
    } else {
      const index = tempValue.indexOf(value);
      tempValue.splice(index, 1);
    }
    dispatchChangeInput({ field: id, value: tempValue });
  };
  return (
    <Fragment>
      {options.map(({ value }, index) => (
        <StyledPrimaryButton
          key={`option-${index}`}
          isSelected={form[id].value.includes(value)}
          label={value}
          onClick={() => handleClick({ value })}
        />
      ))}
    </Fragment>
  );
};

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

MultipleButton.defaultProps = { limit: 2 };

MultipleButton.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
};

SingleButton.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
};
