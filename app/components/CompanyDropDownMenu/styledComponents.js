import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import { blueColor, darkBlueColor, whiteColor } from 'defaultStyleHelper';

import { BaseLink } from '../base_ui/Links';

export const HorizontalDivider = styled.div`
  border-bottom: 0.1rem solid #000000;
  height: 0rem;
  margin: 0.4rem 0 1.3rem;
  opacity: 0.2;
  width: 100%;
`;

export const MenuInternalLink = styled(BaseLink)`
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 400;
  line-height: 1.665rem;
  margin-bottom: 1.5rem;

  &:hover {
    color: ${darkBlueColor};
  }
`;

export const StyledLoginButton = styled(Button)`
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 700;
  justify-content: left;
  line-height: 1.665rem;
  margin-bottom: 1.5rem;
  padding: 0;
  text-transform: initial;

  &:hover {
    background: ${whiteColor};
    color: ${darkBlueColor};
  }
`;

export const StyledMenu = styled(Menu)`
  position: absolute !important;

  .MuiList-padding {
    height: 100%;
    width: 100% !important;
  }

  .MuiList-root {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
  }

  .MuiMenu-paper {
    background-color: ${whiteColor};
    border-radius: 0.4rem;
    border: 0.2rem solid ${blueColor};
    height: 14.3rem;
    margin-top: 1.9rem;
    overflow: hidden;
    top: 5.5rem !important;
    width: 17.7rem;
  }
`;
