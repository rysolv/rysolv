/* eslint-disable react/no-array-index-key */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { StyledPrimaryButton } from '../styledComponents';

export const MultipleButton = ({
  form,
  handleChangeInput,
  id,
  limit,
  options,
}) => {
  const handleClick = ({ value }) => {
    const tempValue = [...form[id]];
    if (tempValue.length < limit && !tempValue.includes(value)) {
      tempValue.push(value);
    } else if (tempValue.length === limit && !tempValue.includes(value)) {
      tempValue.pop();
      tempValue.push(value);
    } else {
      const index = tempValue.indexOf(value);
      tempValue.splice(index, 1);
    }
    handleChangeInput(tempValue);
  };
  return (
    <Fragment>
      {options.map(({ value }, index) => (
        <StyledPrimaryButton
          key={`option-${index}`}
          isSelected={form[id].includes(value)}
          label={value}
          onClick={() => handleClick({ value })}
        />
      ))}
    </Fragment>
  );
};

export const SingleButton = ({ form, handleChangeInput, id, options }) => {
  const [selected, setSelected] = useState(form[id] || null);
  useEffect(() => setSelected(form[id] || null), [id]);

  const handleClick = ({ value }) => {
    const tempValue = selected && selected === value ? '' : value;
    setSelected(tempValue);
    handleChangeInput(tempValue);
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
  form: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
};

SingleButton.propTypes = {
  form: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
};
