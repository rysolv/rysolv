/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {
  BaseInput,
  Circle,
  LanguageWrapper,
  PrimaryButton,
} from 'components/base_ui';
import {
  darkBlueColor,
  defaultFontSize,
  headerColor,
  lightBlueColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
  width: auto;
`;

export const NameBottomSection = styled.div`
  align-items: center;
  display: flex;
  margin-top: 0.6rem;

  span {
    font-size: 1.6rem;
    margin: 0 0.6rem;
  }
`;

export const CandidateRowButton = styled.button`
align-items: center;
background: transparent;
border: none;
color: ${lightBlueColor};
display: flex;
font-size: 1.6rem;
padding: 0;
white-space: nowrap;

&:hover {
  cursor: pointer;
}

svg {
  font-size: 2rem;
  margin-right: 0.8rem;
}
`;

export const CircleGroup = styled.div`
  position: relative;
`;

export const NameWrapper = styled.div`
  font-size: 2.5rem;
`;

export const ProfilePicWrapper = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${whiteColor};
  height: 5rem;
  margin-right: 0.8rem;
  width: 5rem;
`;

export const StyledBaseInput = styled(BaseInput)``;

export const StyledCircle = styled(Circle)`
  &:hover {
    cursor: ${({ isMobileOrTablet }) =>
    isMobileOrTablet ? 'default' : 'pointer'};
  }
`;

export const StyledLanguageWrapper = styled(LanguageWrapper)`
  font-size: ${defaultFontSize};
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
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

export const StyledTableRow = styled(TableRow)``;

export const TableHeaderCell = styled(StyledTableCell)`
  color: white;
  font-size: 1.2rem;
  height: 3.4rem;
  word-break: initial;
`;

export const TableHeaderRow = styled(TableRow)`
  background-color: ${headerColor};
`;

export const TableInputContainer = styled.div`
  align-items: center;
  display: flex;
`;
