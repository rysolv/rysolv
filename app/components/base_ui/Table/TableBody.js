/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import TableRow from './TableRow';
import { StyledTableBody } from './styledComponents';

const TableBody = ({ headers, tableData, tableProps }) => (
  <StyledTableBody>
    {tableData.map((rowData, index) => (
      <TableRow
        key={`table-row-${index}`}
        headers={headers}
        rowData={rowData}
        {...tableProps}
      />
    ))}
  </StyledTableBody>
);

TableBody.propTypes = {
  headers: T.array.isRequired,
  tableData: T.arrayOf(T.shape({ id: T.string })).isRequired,
  tableProps: T.object.isRequired,
};

export default TableBody;
