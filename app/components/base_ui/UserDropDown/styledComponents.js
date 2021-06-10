import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';

import {
  defaultFontSize,
  headerColor,
  inputFieldColor,
} from 'defaultStyleHelper';

export const IconWrapper = styled.div`
  display: inline-flex;
  margin: 0 1rem 0 0rem;
  padding: 0;
  vertical-align: text-top;
`;

export const MenuItemLabel = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const MenuItemValue = styled.div`
  display: inline-flex;
`;

export const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 3.5rem;
  margin: 0.5rem 1rem 0.5rem 0;
  width: 3.5rem;
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    background-color: ${headerColor};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    border: 0.1rem solid #607d8b;
    color: white;
    font-size: ${defaultFontSize};
    overflow: hidden;
  }

  .MuiList-root {
    padding: 0;
  }
`;

export const StyledMenuItem = styled.li`
  color: ${({ notifications }) =>
    notifications ? 'rgb(8,178,110)' : 'inherit'};
  display: flex;
  font-weight: ${({ notifications }) => (notifications ? 'bold' : 'inherit')};
  justify-content: space-between;
  min-width: 20rem;
  padding: 1rem;

  &:hover {
    background-color: #546e7a;
    color: ${inputFieldColor};
    cursor: pointer;
  }
`;

export const StyledUserOverview = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  height: auto;
  padding: 1rem 1.5rem;

  &:hover {
    color: ${inputFieldColor};
  }
`;

export const StyledMenuContainer = styled.div`
  border-bottom: 0.1rem solid #607d8b;
`;
