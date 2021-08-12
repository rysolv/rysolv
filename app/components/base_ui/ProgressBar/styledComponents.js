import styled from 'styled-components';
import MobileStepper from '@material-ui/core/MobileStepper';

import { blueGrayColor, textColor } from 'defaultStyleHelper';

export const ProgressBarWrapper = styled.div`
  display: flex;
  text-align: center;
`;

export const StyledLabel = styled.span`
  align-self: center;
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  position: absolute;
  right: 20%;
  white-space: nowrap;

  @media (max-width: 575px) {
    right: 18%;
  }
  @media (max-width: 475px) {
    right: 17%;
  }
  @media (max-width: 415px) {
    right: 16%;
  }
  @media (max-width: 395px) {
    right: 15%;
  }
  @media (max-width: 350px) {
    right: 14%;
  }
`;

export const StyledProgressBar = styled(MobileStepper)`
  background: inherit;
  justify-content: center;
  width: 100%;

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
    background-color: ${blueGrayColor};
    border-radius: 0.6rem;
    transition-duration: 0.25s;
    transition-property: width;
    transition-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
  }
`;
