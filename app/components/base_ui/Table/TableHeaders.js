import React from 'react';
import T from 'prop-types';
import TableHead from '@material-ui/core/TableHead';

import {
  StyledTableSortLabel,
  TableHeaderCell,
  TableHeaderRow,
} from './styledComponents';

const TableHeaders = ({ headers, onRequestSort, order, orderBy }) => (
  <TableHead>
    <TableHeaderRow>
      {headers.map(header => (
        <TableHeaderCell
          key={`table-data-header-${header}`}
          sortDirection={orderBy === header ? order : false}
        >
          <StyledTableSortLabel
            classes={{ icon: 'icon' }}
            direction={orderBy === header ? order : 'asc'}
            onClick={() => onRequestSort(header)}
          >
            {header}
          </StyledTableSortLabel>
        </TableHeaderCell>
      ))}
    </TableHeaderRow>
  </TableHead>
);

TableHeaders.propTypes = {
  headers: T.array.isRequired,
  onRequestSort: T.func.isRequired,
  order: T.string.isRequired,
  orderBy: T.string.isRequired,
};

export default TableHeaders;
