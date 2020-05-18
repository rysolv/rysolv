import React from 'react';
import T from 'prop-types';

import TableRow from './TableRow';
import { StyledTableBody } from './styledComponents';

const TableBody = ({ handleHovered, headers, hoveredRow, tableData, type }) => (
  <StyledTableBody onMouseLeave={() => handleHovered(0)}>
    {tableData.map(rowData => {
      const { id } = rowData;
      const isHoveredRow = hoveredRow === id;
      return (
        <TableRow
          key={`table-row-${id}`}
          handleHovered={() => handleHovered(id)}
          headers={headers}
          isHoveredRow={isHoveredRow}
          rowData={rowData}
          type={type}
        />
      );
    })}
  </StyledTableBody>
);

TableBody.propTypes = {
  handleHovered: T.func.isRequired,
  headers: T.array.isRequired,
  hoveredRow: T.number.isRequired,
  tableData: T.arrayOf(T.shape({ id: T.number })).isRequired,
  type: T.string.isRequired,
};

export default TableBody;
