import React, { Fragment } from 'react';
import T from 'prop-types';

import { Input, InputError } from '../styledComponents';

export const SingleInput = ({
  form,
  formErrors,
  handleChangeInput,
  handleValidateInput,
  id,
  placeholder,
  type,
}) => (
  <Fragment>
    <Input
      autoComplete={type}
      onBlur={() => handleValidateInput({ field: id, values: form })}
      onChange={e => handleChangeInput(e.target.value)}
      placeholder={placeholder}
      type={type}
      value={form[id]}
    />
    <InputError>{formErrors[id]}</InputError>
  </Fragment>
);

SingleInput.propTypes = {
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
  placeholder: T.string.isRequired,
  type: T.string.isRequired,
};
