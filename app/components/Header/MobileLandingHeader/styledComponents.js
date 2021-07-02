import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';

import { BaseLink, ExpandIcon, SecondaryButton } from 'components/base_ui';
import { blueColor, darkBlueColor, whiteColor } from 'defaultStyleHelper';

export const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const DesktopHeaderContainer = styled.div`
  background: ${blueColor};
  display: flex;
  justify-content: space-between;
  padding: 4rem 3rem;
`;

export const HorizontalDivider = styled.div`
  border-bottom: 0.1rem solid #000000;
  height: 0rem;
  margin: 1.3rem 0 1.9rem;
  opacity: 0.2;
  width: 100%;
`;

export const InternalLink = styled(BaseLink)`
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 400;
  line-height: 1.665rem;
  margin-bottom: 1.5rem;

  &:hover {
    color: ${darkBlueColor};
  }
`;

export const LogoContainer = styled.div`
  background-color: ${whiteColor};
  border-radius: 50%;
  height: 3.2rem;
  margin-right: 1.4rem;
  width: 3.2rem;
`;

export const LogoText = styled.div`
  color: ${whiteColor};
  font-family: Courier;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const LogoWrapper = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
`;

export const StyledExpandIcon = styled(ExpandIcon)`
  color: ${whiteColor};
  margin: -0.8rem;

  &:hover {
    cursor: pointer;
  }

  svg {
    height: 3rem;
    margin-left: 0.5rem;
    margin-right: -0.5rem;
    width: 3rem;
  }
`;

export const StyledLoginLink = styled(BaseLink)`
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 700;
  line-height: 1.665rem;
  padding-left: 0.4rem;

  &:hover {
    color: ${darkBlueColor};
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    background-color: ${whiteColor};
    border-radius: 0.4rem;
    height: 14.3rem;
    margin-top: 1.9rem;
    overflow: hidden;
    width: 17.7rem;
  }

  .MuiList-root {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background: ${whiteColor};
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 700;
  height: 4rem;
  text-transform: none;
  width: 10.7rem;

  &:hover {
    background: ${whiteColor};
  }
`;
