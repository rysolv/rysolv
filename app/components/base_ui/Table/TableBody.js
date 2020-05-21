/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import TableRow from './TableRow';
import { getComparator, stableSort } from './sortingHelpers';
import { StyledTableBody } from './styledComponents';

const TableBody = ({
  handleHovered,
  handleRedirect,
  headers,
  hoveredRow,
  order,
  orderBy,
  route,
  tableData,
  type,
}) => (
  <StyledTableBody onMouseLeave={() => handleHovered('0')}>
    {stableSort(tableData, getComparator({ order, orderBy })).map(
      (rowData, index) => {
        const { id } = rowData;
        const isHoveredRow = hoveredRow === id;
        return (
          <TableRow
            key={`table-row-${id}-${index}`}
            handleHovered={() => handleHovered(id)}
            handleRedirect={handleRedirect}
            headers={headers}
            isHoveredRow={isHoveredRow}
            route={route}
            rowData={rowData}
            type={type}
          />
        );
      },
    )}
  </StyledTableBody>
);

TableBody.propTypes = {
  handleHovered: T.func.isRequired,
  handleRedirect: T.func,
  headers: T.array.isRequired,
  hoveredRow: T.string.isRequired,
  order: T.string.isRequired,
  orderBy: T.string.isRequired,
  route: T.string,
  tableData: T.arrayOf(T.shape({ id: T.string })).isRequired,
  type: T.string.isRequired,
};

export default TableBody;
