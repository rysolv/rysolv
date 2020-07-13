import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const FixedWrapper = styled.div`
  width: 22.5rem;
`;

export const StyledDrawer = styled(Drawer)`
  bottom: inherit !important;
  left: inherit !important;
  right: inherit !important;
  top: inherit !important;
  z-index: 0 !important;

  .MuiDrawer-paperAnchorLeft {
    background-color: #f6f8fa;
  }
`;

export const StyledIconButton = styled(IconButton)`
  color: ${textColor};
  width: 22.5rem;
`;

export const StyledList = styled(({ isSignedIn, ...restProps }) => (
  <List {...restProps} />
))`
  padding-top: 6rem;

  ${mobile} {
    padding-top: ${({ isSignedIn }) => (isSignedIn ? '9.9rem' : '8.1rem')};
  }
`;

export const StyledListWrapper = styled.div`
  color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
  font-size: ${defaultFontSize};

  .MuiSvgIcon-root {
    color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledListItemText = styled(({ active, ...restProps }) => (
  <ListItemText {...restProps} />
))`
  .MuiTypography-body1 {
    color: ${({ active }) => (active ? hoverLinkColor : textColor)};
    font-size: ${defaultFontSize};
  }
`;

export const StyledSideNav = styled.div`
  color: ${textColor};
  height: auto;
  overflow-y: auto;
  overflow: hidden;
  white-space: nowrap;
  width: 22.5rem;
  z-index: 1;

  .MuiButtonBase-root {
    border-radius: 0;
    height: 5rem;
  }

  .MuiDrawer-paper {
    background: transparent;
    border: none;
  }

  .MuiIconButton-label {
    justify-content: end;
    padding-left: 2.1rem;
  }

  .MuiList-padding {
    padding-bottom: 0;
  }

  .MuiListItem-root {
    padding-left: 3rem;
  }

  .MuiSvgIcon-root {
    color: ${textColor};
    height: 2rem;
    width: 2rem;
  }

  .MuiTypography-root {
    font-size: ${defaultFontSize};
  }
`;
