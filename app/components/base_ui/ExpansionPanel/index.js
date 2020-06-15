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
  handleRender,
  Icon,
  propsToPassDown,
  title,
  ...restProps
}) => (
  <StyledExpansionPanel classes={{ expanded: 'expanded' }} {...restProps}>
    <StyledExpansionPanelSummary
      classes={{ expanded: 'expanded', expandIcon: 'expandIcon' }}
      expandIcon={<ExpandMoreIcon />}
      onClick={handleRender}
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
  handleRender: T.func,
  Icon: T.node,
  propsToPassDown: T.object,
  title: T.string,
};

export default BaseExpansionPanel;
