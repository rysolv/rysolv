import React from 'react';
import T from 'prop-types';

import { StyledTextarea } from './styledComponents';

export const Textarea = ({
  dispatchChangeInput,
  form,
  handleValidateInput,
  id,
}) => (
  <StyledTextarea
    height="12.3rem"
    onBlur={() => handleValidateInput({ field: id, values: form })}
    onChange={e => dispatchChangeInput(e.target.value)}
    type="text"
    value={form[id].value}
  />
);

Textarea.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
};

export default Textarea;
