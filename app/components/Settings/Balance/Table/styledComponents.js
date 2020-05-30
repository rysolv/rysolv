import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const EmptyTableRow = styled(TableRow)`
  border: 0.1rem solid #d5d5d5;
  color: ${textColor};
  font-size: ${defaultFontSize};
  height: 5rem;
  text-align: center;
`;

export const StyledTableBody = styled(TableBody)`
  tr:first-of-type {
    td {
      margin-top: 1rem;
    }
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 1.2rem;
  line-height: 1.5rem;
  padding: 0 0 0 1rem;
  text-align: left;
  vertical-align: middle;
`;

export const TableHeaderCell = styled(StyledTableCell)`
  color: ${textColor};
  font-size: 1.2rem;
  height: 3.4rem;
  text-align: center;
`;

export const TableHeaderRow = styled(TableRow)`
  background-color: white;
`;

export const StyledTableRow = styled(TableRow)`
  border: 0.1rem solid #d5d5d5;
  font-size: 1.2rem;
  height: 4rem;
`;

export const StyledTable = styled(Table)`
  border: 0.1rem solid #d5d5d5;
`;
