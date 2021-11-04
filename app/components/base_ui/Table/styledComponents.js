import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { grayColor, lightBlueColor, textColor } from 'defaultStyleHelper';

export const StyledChip = styled(Chip)`
  background-color: #ecf3fc;
  border-radius: 0.7rem;
  color: ${lightBlueColor};
  font-size: 1.4rem;

  &.deletable {
    background-color: #ecf3fc;

    &:focus {
      background-color: #ecf3fc;
    }
  }

  svg {
    color: #a2c6f0;
    height: 2rem;
    width: 2rem;

    &:hover {
      color: #a2c6f0;
    }
  }
`;

export const StyledRadio = styled(Radio)`
  color: ${grayColor};

  &.checked {
    color: ${lightBlueColor};

    &:hover {
      background: #ecf3fc;
    }
  }

  &:hover {
    background: #ecf3fc;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledTableBody = styled(TableBody)`
  tr:first-of-type {
    td {
      margin-top: 1rem;
    }
  }
`;

export const StyledTableCell = styled(({ isHeader, ...restProps }) => (
  <TableCell {...restProps} />
))`
  border-bottom: 0.1rem solid
    ${({ isHeader }) => (!isHeader ? grayColor : 'transparent')};
  color: ${textColor};
  font-size: 1.4rem;
  line-height: 1.5rem;
  padding: 0 0 0 1rem;
  text-align: left;
  vertical-align: middle;
`;

export const StyledTableRow = styled(TableRow)`
  font-size: 1.4rem;
  height: 5rem;
`;

export const TableHeaderCell = styled(StyledTableCell)`
  color: ${textColor};
  font-size: 1.4rem;
  height: 3.4rem;
  text-align: center;
  word-break: initial;
`;

export const TableHeaderRow = styled(TableRow)``;

export const TableInputContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const TableWrapper = styled(Paper)`
  box-shadow: none;
  margin: 2rem auto 0;
`;
