import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';

export const FixedWrapper = styled.div`
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
`;

export const StyledIconButton = styled(IconButton)`
  color: ${textColor};
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
`;

export const StyledSideNav = styled.div`
  color: ${textColor};
  height: auto;
  overflow-y: auto;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
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

export const StyledListWrapper = styled.div`
  color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};

  .MuiSvgIcon-root {
    color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
  }
`;
