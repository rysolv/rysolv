import styled from 'styled-components';
import MobileStepper from '@material-ui/core/MobileStepper';

import {
  defaultFontSize,
  landingButtonGreen,
  textColor,
} from 'defaultStyleHelper';

export const ProgressBarWrapper = styled.div`
  text-align: center;
`;

export const StyledLabel = styled.span`
  color: ${textColor};
  font-size: ${defaultFontSize};
  font-weight: 500;
`;

export const StyledProgressBar = styled(MobileStepper)`
  justify-content: center;

  .progress {
    animation-duration: 333ms;
    animation-fill-mode: forwards;
    animation-name: ProgressBar-progressBarAnimation-e04e41b;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    background-color: #d4d7dc;
    border-radius: 0.6rem;
    height: 1.2rem;
    max-width: 100%;
  }
  .MuiLinearProgress-barColorPrimary {
    background-color: ${landingButtonGreen};
    border-radius: 0.6rem;
    transition-duration: 0.25s;
    transition-property: width;
    transition-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
  }
`;
