import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';

import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS, mobileXXS } = mediaQueriesByDevice;

export const StyledFormControlLabel = styled(({ isActive, ...restProps }) => (
  <FormControlLabel {...restProps} />
))`
  border: 1px solid #d1d5da;
  cursor: pointer;
  margin: 0;

  &:first-child {
    border-bottom-left-radius: 3px;
    border-color: ${({ isActive }) => (isActive ? '#1e88e5' : '#d1d5da')};
    border-right: ${({ isActive }) => (isActive ? '1px solid #d1d5d' : 'none')};
    border-top-left-radius: 3px;
  }

  &:last-child {
    border-bottom-right-radius: 3px;
    border-color: ${({ isActive }) => (isActive ? '#1e88e5' : '#d1d5da')};
    border-left: ${({ isActive }) => (isActive ? '1px solid #d1d5d' : 'none')};
    border-top-right-radius: 3px;
  }

  & .label {
    color: ${textColor};
    font-size: ${defaultFontSize};
    padding: 0 2rem 0 1rem;

    ${mobileXS} {
      padding: 0 1rem 0 1rem;
    }

    ${mobileXXS} {
      padding: 0 0.5rem 0 0;
    }
  }
`;

export const StyledRadioButton = styled(Radio)`
  color: ${textColor};

  &.checked {
    color: #1e88e5;
  }

  svg {
    font-size: 2rem;
  }
`;

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  display: flex;
  flex-direction: row;
`;
