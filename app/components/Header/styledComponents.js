import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BaseLink, HeaderSearchBar, UserNavBar } from 'components/base_ui';
import { defaultFontSize, headerColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BottomBarWrapper = styled.div``;

export const Browse = styled(BaseLink)`
  color: white;
  font-size: ${defaultFontSize};
  margin: 0 1rem;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonsWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const Container = styled.section`
  background-color: ${headerColor};
  color: white;
  display: flex;
  font-size: ${defaultFontSize};
  height: auto;
  justify-content: space-between;
  padding: 0.5rem;

  ${mobile} {
    flex-direction: column;
  }
`;

export const HeaderSection = styled.section`
  padding-bottom: 6rem;

  ${mobile} {
    padding-bottom: 8.188rem;
  }
`;

export const LinkTitle = styled.div`
  margin-left: ${({ isMobile }) => (isMobile ? '3rem' : '0')};
`;

export const LogoWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  width: 40%;
`;

export const StyledHeaderLink = styled(BaseLink)`
  color: white;
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin: 0 1rem;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
`;

export const StyledHeaderSearchBar = styled(HeaderSearchBar)`
  ${mobile} {
    margin: auto;
    padding-bottom: 0.5rem;
    width: 90%;
  }
`;

export const StyledLink = styled(Link)`
  align-self: center;
  display: flex;
  padding-right: 2rem;
  white-space: nowrap;
`;

export const StyledLogo = styled.div`
  padding-right: 0.5rem;
`;

export const StyledUserNavBar = styled(UserNavBar)`
  margin-right: 0.5rem;
  padding: 0.25rem;
  white-space: nowrap;
`;

export const TopBarWrapper = styled.div`
  ${mobile} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ isSignedIn }) => (isSignedIn ? '0.5rem' : '0')};
  }
`;
