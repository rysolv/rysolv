import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { FileInputIcon, HiddenInput } from './styledComponents';

const EditIcon = iconDictionary('edit');

const BaseFileInput = ({ accept, id, onChange }) => (
  <FileInputIcon htmlFor={id}>
    {EditIcon}
    <HiddenInput
      accept={accept}
      id={id}
      name={id}
      onChange={onChange}
      type="file"
    />
  </FileInputIcon>
);

BaseFileInput.propTypes = {
  accept: T.string.isRequired,
  id: T.string.isRequired,
  onChange: T.func.isRequired,
};

export default BaseFileInput;
