import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import {
  defaultFontSize,
  detailFontSize,
  lightBlueColor,
  verifyColor,
} from 'defaultStyleHelper';

export const StyledBack = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  text-align: center;
`;

export const StyledCode = styled.div`
  color: white;
`;

export const StyledCoin = styled.div`
  display: flex;

  svg {
    height: 1.75rem;
    width: 1.75rem;
  }
`;

export const StyledComment = styled.div`
  color: inherit;
  display: inline-block;
  text-align: center;
`;

export const StyledDownArrow = styled.div`
  display: inline-block;

  svg {
    height: 3rem;
    width: 3rem;
  }
  &:hover {
    color: #b0bec5;
  }
`;

export const StyledExpandIcon = styled.div`
  display: inline-block;

  svg {
    height: 3rem;
    width: 3rem;
  }
  &:hover {
    color: white;
  }
`;

export const StyledIconTooltip = styled(Tooltip)`
  display: inline-block;

  .MuiTooltip-popper {
    font-size: ${defaultFontSize};
  }
`;

export const StyledMonocleIcon = styled.div`
  color: inherit;
  display: inline-block;
  text-align: center;

  * {
    fill: inherit;
    stroke: inherit;
    stroke-width: 150;
  }
`;

export const StyledNavIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: space-around;
  padding: 0;
  position: absolute;
  width: 2rem;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    background: white;
    border-radius: 10px;
    height: 0.2rem;
    position: relative;
    transform-origin: 1px;
    transition: all 0.3s linear;
    width: 2rem;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

export const StyledSettings = styled.div`
  color: #424242;
  display: inline-block;
  text-align: center;

  &:hover {
    color: ${lightBlueColor};
    cursor: pointer;
  }
`;

export const StyledTooltipLabel = styled.span`
  font-size: ${detailFontSize};
`;

export const StyledVerified = styled.div`
  color: ${verifyColor};
  display: inline-block;
  text-align: center;
`;
