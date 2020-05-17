import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import {
  defaultFontSize,
  headerColor,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';

export const FixedWrapper = styled.div`
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
`;

export const StyledIconButton = styled(IconButton)`
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
`;

export const StyledListWrapper = styled.div`
  color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};

  .MuiSvgIcon-root {
    color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
  }
`;

export const StyledSideNav = styled.div`
  position: fixed;
  color: ${textColor};
  height: auto;
  overflow-y: auto;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ open }) => (open ? '22.5rem' : '7.5rem')};
  z-index: 1;

  .MuiDrawer-paper {
    background: transparent;
    border: none;
  }

  .MuiListItem-root {
    padding-left: 3rem;
  }

  .MuiTypography-root {
    font-size: ${defaultFontSize};
  }

  .MuiButtonBase-root {
    border-radius: 0;
    height: 5rem;
  }

  .MuiSvgIcon-root {
    height: 2rem;
    width: 2rem;
  }

  .MuiSvgIcon-root {
    color: ${headerColor};
  }

  .MuiIconButton-label {
    justify-content: end;
    padding-left: 2.1rem;
  }
`;
