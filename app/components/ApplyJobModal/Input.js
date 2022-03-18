import React from 'react';
import T from 'prop-types';

import { Input } from './styledComponents';

const InputOption = ({ onBlur, onChange, value }) => (
  <Input
    height="4.9rem"
    onBlur={onBlur}
    onChange={onChange}
    type="text"
    value={value}
  />
);

InputOption.propTypes = {
  onBlur: T.func.isRequired,
  onChange: T.func.isRequired,
  value: T.string.isRequired,
};

export default InputOption;
