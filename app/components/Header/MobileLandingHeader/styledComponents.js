/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';

import {
  BaseLink,
  ExpandIcon,
  SecondaryButton,
  UserNavBar,
} from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  grayColor,
  lightBlueColor,
  whiteColor,
} from 'defaultStyleHelper';

export const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const HorizontalDivider = styled.div`
  border-bottom: 0.1rem solid #000000;
  height: 0rem;
  margin: 1.3rem 0 1.9rem;
  opacity: 0.2;
  width: 100%;
`;

export const InternalLink = styled(
  ({
    shouldRemoveFirst,
    shouldRemoveSecond,
    shouldRemoveThird,
    ...restProps
  }) => <BaseLink {...restProps} />,
)`
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding-right: 2.2rem;

  &:hover {
    color: ${whiteColor};
  }

  @media (max-width: 800px) {
    display: ${({ shouldRemoveFirst }) =>
      shouldRemoveFirst ? 'none' : 'block'};
  }

  @media (max-width: 750px) {
    display: ${({ shouldRemoveFirst, shouldRemoveSecond }) =>
      shouldRemoveFirst || shouldRemoveSecond ? 'none' : 'block'};
  }

  @media (max-width: 470px) {
    display: ${({ shouldRemoveFirst, shouldRemoveSecond, shouldRemoveThird }) =>
      shouldRemoveFirst || shouldRemoveSecond || shouldRemoveThird
        ? 'none'
        : 'block'};
  }
`;

export const Logo = styled.div`
  background: white;
  border-radius: 50%;
  height: 4rem;
  margin-right: 1rem;
  text-align: center;
  width: 4rem;

  svg {
    height: 100%;
    width: 2.5rem;
  }

  @media (max-width: 380px) {
    margin-right: 0.5rem;
  }
`;

export const LogoWrapper = styled.div`
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }
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

export const MessageLink = styled(InternalLink)`
  margin-right: 1.2rem;
  padding-right: 0.5rem;

  @media (max-width: 800px) {
    display: ${({ shouldRemoveFirst }) =>
      shouldRemoveFirst ? 'none' : 'block'};
  }

  @media (max-width: 750px) {
    display: ${({ shouldRemoveFirst, shouldRemoveSecond }) =>
      shouldRemoveFirst || shouldRemoveSecond ? 'none' : 'block'};
  }

  @media (max-width: 470px) {
    display: ${({ shouldRemoveFirst, shouldRemoveSecond, shouldRemoveThird }) =>
      shouldRemoveFirst || shouldRemoveSecond || shouldRemoveThird
        ? 'none'
        : 'block'};
  }
`;

export const MessageWrapper = styled.div`
  position: relative;
`;

export const MobileHeaderContainer = styled.div`
  background: ${blueColor};
  display: flex;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

export const StyledExpandIcon = styled(ExpandIcon)`
  color: ${whiteColor};

  &:hover {
    cursor: pointer;
  }

  svg {
    height: 3rem;
    width: 3rem;
  }
`;

export const StyledLoginLink = styled(BaseLink)`
  color: ${darkBlueColor};
  font-size: 1.376rem;
  font-weight: 700;
  line-height: 1.665rem;

  &:hover {
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
    box-shadow: 0 0.1rem 0.4rem ${grayColor};
    margin-top: 1.9rem;
    overflow: hidden;
    top: 5.5rem !important;
    width: 17.7rem;
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

  @media (max-width: 380px) {
    margin-right: 0;
    width: auto;
  }
`;

export const StyledUserNavBar = styled(UserNavBar)`
  margin: 0 0 0 1.2rem;

  img {
    height: 4rem;
    width: 4rem;
  }
`;

export const UnreadMessages = styled.div`
  background-color: ${lightBlueColor};
  border-radius: 50%;
  color: ${whiteColor};
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
  min-width: 2rem;
  position: absolute;
  right: 0;
  text-align: center;
  top: -1.2rem;

  @media (max-width: 800px) {
    top: ${({ shouldRemoveFirst }) =>
      shouldRemoveFirst ? '-2.5rem' : '-1.2rem'};
    right: ${({ shouldRemoveFirst }) => (shouldRemoveFirst ? '-8.5rem' : '0')};
  }

  @media (max-width: 750px) {
    top: ${({ shouldRemoveFirst, shouldRemoveSecond }) =>
      shouldRemoveFirst || shouldRemoveSecond ? '-2.5rem' : '-1.2rem'};
    right: ${({ shouldRemoveFirst, shouldRemoveSecond }) =>
      shouldRemoveFirst || shouldRemoveSecond ? '-8.5rem' : '0'};
  }

  @media (max-width: 470px) {
    top: ${({ shouldRemoveFirst, shouldRemoveSecond, shouldRemoveThird }) =>
      shouldRemoveFirst || shouldRemoveSecond || shouldRemoveThird
        ? '-2.5rem'
        : '-1.2rem'};
    right: ${({ shouldRemoveFirst, shouldRemoveSecond, shouldRemoveThird }) =>
      shouldRemoveFirst || shouldRemoveSecond || shouldRemoveThird
        ? '-6.4rem'
        : '0'};
  }
`;

export const VerticalDivider = styled.div`
  background: ${whiteColor};
  border: 0.2rem solid ${whiteColor};
  height: 0rem;
  transform: rotate(90deg);
  width: 2.1rem;

  @media (max-width: 470px) {
    display: none;
  }
`;

export const Wordmark = styled.div`
  svg {
    height: 2.5rem;
    width: auto;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;
