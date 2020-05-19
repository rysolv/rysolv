import React from 'react';
import T from 'prop-types';

import TableRow from './TableRow';
import { getComparator, stableSort } from './sortingHelpers';
import { StyledTableBody } from './styledComponents';

const TableBody = ({
  handleHovered,
  headers,
  hoveredRow,
  order,
  orderBy,
  tableData,
  type,
}) => (
  <StyledTableBody onMouseLeave={() => handleHovered('0')}>
    {stableSort(tableData, getComparator({ order, orderBy })).map(rowData => {
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
  hoveredRow: T.string.isRequired,
  order: T.string.isRequired,
  orderBy: T.string.isRequired,
  tableData: T.arrayOf(T.shape({ id: T.string })).isRequired,
  type: T.string.isRequired,
};

export default TableBody;
