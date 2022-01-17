import React from 'react';
import T from 'prop-types';

import { Input } from './styledComponents';

const InputOption = ({
  dispatchChangeInput,
  form,
  handleValidateInput,
  id,
}) => (
  <Input
    height="4.9rem"
    onBlur={() =>
      handleValidateInput({ field: id, formType: 'profile', values: form })
    }
    onChange={e =>
      dispatchChangeInput({ field: id, form: 'profile', value: e.target.value })
    }
    type="text"
    value={form[id] || ''}
  />
);

InputOption.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
};

export default InputOption;
