import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const EmptyTableRow = styled(TableRow)`
  border-top: 0.1rem solid #cfd8dc;
  font-size: ${defaultFontSize};
  height: 5rem;
  text-align: center;
`;

export const IconCellContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: 300;
  justify-content: space-between;
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const StyledTableBody = styled(TableBody)`
  tr:first-of-type {
    td {
      margin-top: 1rem;
    }
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-size: ${defaultFontSize};
  font-weight: 300;
  line-height: 1.5rem;
  padding: 0 0 0 1rem;
  text-align: center;
  vertical-align: middle;
`;

export const StyledIconCell = styled(StyledTableCell)`
  max-width: 28rem;
  min-width: 28rem;
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledTableRow = styled(TableRow)`
  border-top: 0.1rem solid #cfd8dc;
  font-size: 1.2rem;
  height: 4rem;
`;

export const StyledTableSortLabel = styled(TableSortLabel)`
  color: ${textColor};
  &:focus,
  &:hover,
  path {
    color: ${textColor};

    .icon {
      color: ${textColor};
    }
  }
`;

export const TableHeaderCell = styled(StyledTableCell)`
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 300;
  height: 3.4rem;
  text-align: center;
`;

export const TableHeaderRow = styled(TableRow)``;

export const TableWrapper = styled(Paper)`
  border: 0.1rem solid #cfd8dc;
  border-bottom: none;
  box-shadow: none;
  color: ${textColor};
  margin: 1rem;
  overflow: hidden;
`;
