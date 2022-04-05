/* eslint-disable prettier/prettier */
import React from 'react';
import styled, { css } from 'styled-components';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {
  BaseInput,
  Circle,
  IconButton,
  LanguageWrapper,
  PrimaryButton,
} from 'components/base_ui';
import {
  blueColor, 
  darkBlueColor,
  defaultFontSize,
  grayColor,
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
  margin: auto;
  text-transform: initial;
  width: auto;
`;

export const NameBottomSection = styled.div`
  align-items: center;
  display: flex;
  margin-top: 0.6rem;
  white-space: nowrap;

  span {
    font-size: 1.6rem;
    margin: 0 0.6rem;
  }
`;

export const NameTopSection = styled.div`
  display: flex;
  align-items: center;
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

export const CandidateRowLink = styled.a`
align-items: center;
background: transparent;
border: none;
color: ${lightBlueColor};
display: flex;
font-size: 1.6rem;
padding: 0;
white-space: nowrap;

&:hover {
  color: ${lightBlueColor};
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

export const Name = styled.div`
  font-size: 2.5rem;
  line-height: 3.36rem;
  white-space: nowrap;
`;

export const ProfilePic = styled.img`
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

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledTableBody = styled(TableBody)`
  tr:first-of-type {
    td {
      padding: 3.2rem 0;
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

export const StyledTableRow = styled(TableRow)`
  position: relative;
`;

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

export const StyledIconButton = styled(({ isSaved, ...restProps }) => (
  <IconButton {...restProps} />
))`
  margin: 0.4rem;
  position: absolute;
  right: 0;

  svg {
    color: ${({ isSaved }) => (isSaved ? blueColor : grayColor)};
    height: 2.5rem;
    width: 2.5rem;
  }
`;
