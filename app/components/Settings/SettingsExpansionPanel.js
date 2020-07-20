import React from 'react';
import T from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import {
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledH3,
} from './styledComponents';

const SettingsExpansionPanel = ({ Component, title }) => (
  <StyledExpansionPanel classes={{ expanded: 'expanded' }}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <StyledH3>{title}</StyledH3>
    </ExpansionPanelSummary>
    <StyledExpansionPanelDetails>
      <Component />
    </StyledExpansionPanelDetails>
  </StyledExpansionPanel>
);

SettingsExpansionPanel.propTypes = {
  Component: T.oneOfType([T.func, T.object]),
  title: T.string,
};

export default SettingsExpansionPanel;
