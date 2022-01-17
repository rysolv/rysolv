import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const IconWrapper = styled.div`
  color: ${textColor};
  padding: 0 1rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  color: ${textColor};

  &:before {
    background-color: white;
  }

  &.expanded {
    margin: 0rem;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  padding: 0;
`;

export const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  min-height: 0 !important;

  .expanded {
    margin: 0;
  }

  .expandIcon {
    margin-right: -1.2rem;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: ${defaultFontSize};
`;
