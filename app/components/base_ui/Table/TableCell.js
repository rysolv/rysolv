import React from 'react';
import T from 'prop-types';

import { StyledTableCell } from './styledComponents';

const TableCell = ({ cellData }) => (
  <StyledTableCell>{cellData}</StyledTableCell>
);

TableCell.propTypes = { cellData: T.oneOfType([T.number, T.string]) };

export default TableCell;
