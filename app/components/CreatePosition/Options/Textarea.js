import React from 'react';
import T from 'prop-types';

import { Textarea } from './styledComponents';

const TextareaOption = ({ handleChangeInput, onBlur, value }) => (
  <Textarea
    height="12.3rem"
    onBlur={onBlur}
    onChange={e => handleChangeInput(e.target.value)}
    type="text"
    value={value}
  />
);

TextareaOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default TextareaOption;
