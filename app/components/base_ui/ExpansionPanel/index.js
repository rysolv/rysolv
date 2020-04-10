import React from 'react';
import T from 'prop-types';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ConditionalRender } from 'components/base_ui';

import {
  IconWrapper,
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledTypography,
} from './styleComponents';

const BaseExpansionPanel = ({ Component, Icon, propsToPassDown, title }) => (
  <StyledExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <ConditionalRender
        Component={<IconWrapper>{Icon}</IconWrapper>}
        shouldRender={!!Icon}
      />
      <StyledTypography>{title}</StyledTypography>
    </ExpansionPanelSummary>
    <StyledExpansionPanelDetails>
      <Component {...propsToPassDown} />
    </StyledExpansionPanelDetails>
  </StyledExpansionPanel>
);

BaseExpansionPanel.propTypes = {
  Component: T.oneOfType([T.func, T.object]),
  Icon: T.node,
  propsToPassDown: T.object,
  title: T.string,
};

export default BaseExpansionPanel;
