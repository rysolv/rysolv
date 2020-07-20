import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import { detailFontSize, textColor } from 'defaultStyleHelper';

export const StyledTooltip = styled(props => (
  <Tooltip
    classes={{ popper: props.className, tooltip: 'tooltip' }}
    {...props}
  />
))`
  opacity: 1;

  & .tooltip {
    background-color: white;
    border: 0.1rem solid white;
    box-shadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)';
    color: ${textColor};
    font-size: 1.3rem;
  }
`;

export const StyledTooltipLabel = styled.span`
  font-size: ${detailFontSize};
`;
