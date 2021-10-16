import React from 'react';
import T from 'prop-types';

import { Input } from './styledComponents';

const InputOption = ({ handleChangeInput, onBlur, value }) => (
  <Input
    height="4.9rem"
    onBlur={onBlur}
    onChange={e => handleChangeInput(e.target.value)}
    type="text"
    value={value}
  />
);

InputOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default InputOption;
