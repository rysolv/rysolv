import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';

import { lightBlueColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS, mobileXXS } = mediaQueriesByDevice;

export const StyledFormControlLabel = styled(({ isActive, ...restProps }) => (
  <FormControlLabel {...restProps} />
))`
  cursor: pointer;
  margin: 0;
  width: 50%;

  & .label {
    color: ${textColor};
    font-size: 1.6rem;
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
  color: #e1e2e3;

  &.checked {
    color: ${lightBlueColor};
  }

  svg {
    font-size: 2rem;
  }
`;

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
