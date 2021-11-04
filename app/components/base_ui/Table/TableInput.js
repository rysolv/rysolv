import React from 'react';
import T from 'prop-types';

import { StyledRadio, TableInputContainer } from './styledComponents';

const TableInput = ({ checked, onChange }) => (
  <TableInputContainer>
    <StyledRadio
      checked={checked}
      classes={{
        root: 'root',
        checked: 'checked',
      }}
      color="primary"
      disableRipple
      onChange={onChange}
    />
  </TableInputContainer>
);

TableInput.propTypes = {
  checked: T.oneOfType([T.bool, T.string]),
  onChange: T.func.isRequired,
};

export default TableInput;
