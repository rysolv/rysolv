import React, { Fragment } from 'react';
import T from 'prop-types';

import { Input, InputError } from './styledComponents';

export const SingleInput = ({
  dispatchChangeInput,
  form,
  handleValidateInput,
  id,
  placeholder,
  type,
}) => (
  <Fragment>
    <Input
      autoComplete={type}
      onBlur={() => handleValidateInput({ field: id, values: form })}
      onChange={e => dispatchChangeInput({ field: id, value: e.target.value })}
      placeholder={placeholder}
      type={type}
      value={form[id].value}
    />
    <InputError>{form[id].error}</InputError>
  </Fragment>
);

SingleInput.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
  placeholder: T.string.isRequired,
  type: T.string.isRequired,
};
