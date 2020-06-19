import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

export const IconWrapper = styled.div`
  padding: 0 1rem;
  color: rgba(0, 0, 0, 0.7);

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);

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
  font-size: 1.4rem;
`;
