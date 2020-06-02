import React from 'react';
import T from 'prop-types';
import TableHead from '@material-ui/core/TableHead';

import { ConditionalRender } from 'components/base_ui';

import {
  EmptyTableRow,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableRow,
  TableHeaderCell,
  TableHeaderRow,
} from './styledComponents';

const EmptyTableMessageComponent = ({ numColumn, type }) => {
  const emptyTableMessageDictionary = {
    statements: 'There are currently no statements to display.',
    workHistory: 'There is currently no work history to display.',
  };
  return (
    <StyledTableBody>
      <EmptyTableRow>
        <td colSpan={numColumn}>{emptyTableMessageDictionary[type]}</td>
      </EmptyTableRow>
    </StyledTableBody>
  );
};

const TableBodyComponent = ({ rows }) => (
  <StyledTableBody>
    {rows.map(row => (
      <StyledTableRow key={row.name}>
        {Object.keys(row).map(cell => (
          <StyledTableCell key={`cell-${cell}`} align="right">
            {row[cell]}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))}
  </StyledTableBody>
);

const BaseTable = ({ headers, rows, type }) => (
  <StyledTable>
    <TableHead>
      <TableHeaderRow>
        {headers.map(header => (
          <TableHeaderCell key={`header-${header}`} align="right">
            {header}
          </TableHeaderCell>
        ))}
      </TableHeaderRow>
    </TableHead>
    <ConditionalRender
      Component={<TableBodyComponent rows={rows} />}
      FallbackComponent={
        <EmptyTableMessageComponent numColumn={headers.length} type={type} />
      }
      shouldRender={!!rows.length}
    />
  </StyledTable>
);

BaseTable.propTypes = {
  headers: T.array,
  rows: T.array,
  type: T.string,
};

EmptyTableMessageComponent.propTypes = {
  numColumn: T.number,
  type: T.string,
};

TableBodyComponent.propTypes = { rows: T.array };

export default BaseTable;
