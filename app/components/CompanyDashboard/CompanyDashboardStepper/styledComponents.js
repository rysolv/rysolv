/* eslint-disable no-nested-ternary, prettier/prettier */
import styled from 'styled-components';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';

import {
  blueColor,
  blueGrayColor,
  defaultFontSize,
  grayColor,
  textColor,
} from 'defaultStyleHelper';

export const StyledStepper = styled(Stepper)`
  background: inherit;
  width: 100%;

  .MuiStepIcon-text {
    font-size: ${defaultFontSize};
  }

  .MuiStepLabel-label {
    color: ${textColor};
    font-size: 1.6rem;
    margin-top: 0.8rem;
  }
`;

export const StyledStep = styled(Step)`
  .MuiStepIcon-root {
    color: ${({ active, completed }) =>
    active ? blueGrayColor : completed ? blueColor : grayColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;
