import React from 'react';
import T from 'prop-types';

import Markdown from 'components/Markdown';

const TextareaOption = ({ handleChangeInput, onBlur, value }) => (
  <Markdown
    body={value}
    handleInput={val => handleChangeInput(val)}
    onBlur={onBlur}
  />
);

TextareaOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default TextareaOption;
