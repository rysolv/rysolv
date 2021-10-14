import React from 'react';
import T from 'prop-types';

import { StyledRadio, TableInputContainer } from './styledComponents';

const TableInput = ({ checked, onChange }) => (
  <TableInputContainer>
    <StyledRadio checked={checked} onChange={onChange} />
  </TableInputContainer>
);

TableInput.propTypes = {
  checked: T.bool.isRequired,
  onChange: T.func.isRequired,
};

export default TableInput;
