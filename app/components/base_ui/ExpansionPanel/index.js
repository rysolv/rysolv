import React from 'react';
import T from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ConditionalRender from '../ConditionalRender';
import {
  IconWrapper,
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledExpansionPanelSummary,
  StyledTypography,
} from './styleComponents';

const BaseExpansionPanel = ({
  Component,
  Icon,
  open,
  propsToPassDown,
  title,
  ...restProps
}) => (
  <StyledExpansionPanel
    classes={{ expanded: 'expanded' }}
    defaultExpanded={open}
    {...restProps}
  >
    <StyledExpansionPanelSummary
      classes={{ expanded: 'expanded', expandIcon: 'expandIcon' }}
      expandIcon={<ExpandMoreIcon />}
    >
      <ConditionalRender
        Component={<IconWrapper>{Icon}</IconWrapper>}
        shouldRender={!!Icon}
      />
      <StyledTypography>{title}</StyledTypography>
    </StyledExpansionPanelSummary>
    <StyledExpansionPanelDetails>
      <Component {...propsToPassDown} />
    </StyledExpansionPanelDetails>
  </StyledExpansionPanel>
);

BaseExpansionPanel.propTypes = {
  Component: T.oneOfType([T.func, T.object]),
  Icon: T.node,
  open: T.bool,
  propsToPassDown: T.object,
  title: T.string,
};

export default BaseExpansionPanel;
