import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import { headerColor } from 'defaultStyleHelper';

export const IconWrapper = styled.div`
  margin: 0 1rem 0 0rem;
  display: inline-flex;
  padding: 0;
  vertical-align: text-top;
`;

export const MenuItemLabel = styled.div`
  display: inline-flex;
  align-items: center;
`;
export const MenuItemValue = styled.div`
  display: inline-flex;
`;

export const StyledAvatar = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  margin: 0.5rem 1rem 0.5rem 0;
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    overflow: hidden;
    background-color: ${headerColor};
    border: 0.1rem solid #607d8b;
    border-top: none;
    color: white;
    font-size: 1.4rem;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  .MuiList-root {
    padding: 0;
  }
`;

export const StyledMenuItem = styled.li`
  padding: 1rem;
  min-width: 20rem;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #546e7a;
    color: #cfd8dc;
    cursor: pointer;
  }
`;

export const StyledUserOverview = styled.div`
  height: auto;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #cfd8dc;
  }
`;

export const StyledMenuContainer = styled.div`
  border-bottom: 0.1rem solid #607d8b;
`;
