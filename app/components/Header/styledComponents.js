/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';

import {
  BaseDrawer,
  BaseLink,
  HeaderSearchBar,
  UserNavBar,
} from 'components/base_ui';
import { defaultFontSize, headerColor, lightBlueColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, tablet } = mediaQueriesByDevice;

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

export const DropdownButtonWrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  height: 2rem;
  margin: 0 1rem 0 0.75rem;
  white-space: nowrap;

  &:hover {
    color: #b0bec5;
    cursor: pointer;
  }

  svg {
    font-size: 2rem;
  }
`;

export const LinkTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin-left: ${({ isMobile }) => (isMobile ? '3rem' : '0')};
`;

export const LogoWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  width: 40%;
`;

export const MenuItem = styled.div`
  color: ${textColor};
  padding: 6px 8px 6px 16px;

  &:hover {
    background-color: ${lightBlueColor};
    color: #fff;
    cursor: pointer;
  }
`;

export const MobileDrawerComponent = styled(BaseDrawer)`
  .drawer-paper {
    height: 100%;
    width: 25rem;
  }
`;

export const NavLink = styled(({ shouldRemoveFirst, shouldRemoveSecond, ...restProps }) => (
  <BaseLink {...restProps} />
))`
  color: white;
  font-size: ${defaultFontSize};
  margin: 0 1rem;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  ${tablet} {
    display: ${({ shouldRemoveFirst }) =>
    shouldRemoveFirst ? 'none' : 'block'};
  }

  @media (max-width: 365px) {
    display: ${({ shouldRemoveFirst, shouldRemoveSecond }) =>
    shouldRemoveFirst || shouldRemoveSecond
      ? 'none'
      : 'block'};
  }
`;

export const StyledAppBar = styled(({ isLandingOrRecruitmentPage, ...restProps }) => (
  <AppBar {...restProps} />
))`
  box-shadow: ${({ isLandingOrRecruitmentPage }) => (isLandingOrRecruitmentPage ? 'none' : '')};
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

export const StyledLink = styled.div`
  align-self: center;
  display: flex;
  padding-right: 2rem;
  white-space: nowrap;
`;

export const StyledMenu = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #e1e4e8;
  box-shadow: 0 0.8rem 2.4rem rgba(149, 157, 165, 0.2);
  margin-top: 2.2rem;
  padding: 0.4rem 0;
  position: absolute;
  right: 9%;
  top: 100%;
  width: 16rem;
  z-index: 100;

  &:after,
  &:before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    left: 0;
    position: absolute;
    width: 0;
  }

  &:after {
    border-color: transparent transparent white transparent;
    border-width: 9px;
    left: 121px;
    top: -17px;
  }

  &:before {
    border-color: transparent transparent #e1e4e8 transparent;
    border-width: 9px;
    left: 121px;
    top: -19px;
  }
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
