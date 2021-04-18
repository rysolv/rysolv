import React from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  BaseDropDownMenu,
  BaseTextInput,
  ErrorSuccessBanner,
} from 'components/base_ui';
import {
  commentHeaderColor,
  defaultFontSize,
  hoverLinkColor,
  lightBlueColor,
  subTextLightGrey,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const DetailContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DetailViewContainer = styled.div`
  color: ${textColor};
  display: flex;

  ${mobile} {
    flex-direction: column;
  }
`;

export const EditUserImageWrapper = styled.div`
  align-self: center;
  position: relative;
`;

export const EmptyComponentContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 30rem;
  justify-content: center;
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IconButtonContainer = styled.div`
  align-self: center;
  height: 100%;
`;

export const IconButtonGroup = styled.div`
  display: flex;
`;

export const InputIconGroup = styled.label`
  align-items: center;
  background-color: white;
  border-radius: 2rem;
  border: 0.2rem solid ${lightBlueColor};
  bottom: -1rem;
  color: ${lightBlueColor};
  display: flex;
  height: 4rem;
  justify-content: center;
  padding: 1rem 0;
  position: absolute;
  right: -1rem;
  width: auto;

  &:hover {
    background-color: white;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const Language = styled.div`
  align-items: center;
  display: flex;
  flex-flow: wrap;
`;

export const LanguageListItem = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LinksWrapper = styled.div`
  color: ${subTextLightGrey};
  font-size: ${defaultFontSize};
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

export const OneLink = styled.div`
  align-items: center;
  display: flex;
`;

export const OneLinkWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const SettingsTabsWrapper = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;
  width: 100%;

  ${mobile} {
    margin-left: 0;
    margin-top: ${({ displayBottom }) => (displayBottom ? '0' : '2rem')};
  }
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin-left: 1rem;
`;

export const StyledBaseTextInput = styled(BaseTextInput)`
  margin: 0;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-top: 1.6rem;
  width: 100%;
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  color: ${textColor};

  &:before {
    background-color: white;
  }

  &.expanded {
    margin: 0rem;
  }

  .MuiExpansionPanelSummary-root {
    margin: 0;
    padding: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  justify-content: center;
  padding: 0;
  width: 100%;
`;

export const StyledH3 = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: ${({ removeMarginTop }) => (removeMarginTop ? '0 0 3rem' : '3rem 0')};
`;

export const StyledLanguageAutocomplete = styled.div`
  width: 80%;
`;

export const StyledPaper = styled(Paper)`
  background-color: transparent;
  box-shadow: none;
  width: 100%;
`;

export const StyledPopper = styled(Popper)`
  background: #37474f;
  border-radius: 0.2rem;
  padding: 1rem;
  top: -0.2rem !important;
`;

export const StyledTab = styled(Tab)`
  font-size: ${defaultFontSize};
  min-width: fit-content;

  &.selected {
    background-color: white;
    color: ${hoverLinkColor};
  }

  &:hover {
    background-color: white;
    color: ${hoverLinkColor};
  }

  .MuiTab-wrapper {
    white-space: nowrap;
  }
`;

export const StyledTabs = styled(({ displayBottom, ...restProps }) => (
  <Tabs {...restProps} />
))`
  margin: 4rem 0 0;

  ${mobile} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
    margin-top: 2rem;
  }

  .indicator {
    background-color: transparent;
  }

  svg {
    color: ${textColor};
    font-size: 2rem;
  }
`;

export const TabItem = styled.div`
  color: ${commentHeaderColor};
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
`;

export const TabItemBorder = styled.div`
  border-bottom: ${({ isActive }) =>
    isActive ? `0.2rem solid ${commentHeaderColor}` : 'none'};

  &:hover {
    cursor: pointer;
    border-bottom: 0.2rem solid ${commentHeaderColor};
  }
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding-right: 5rem;
  width: fit-content;

  ${laptop} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
    padding-right: 0;
    width: 100%;
  }
`;

export const UserImage = styled.img`
  height: 25rem;
  margin-bottom: 0.5rem;
  object-fit: cover;
  width: 25rem;

  ${mobile} {
    align-self: center;
  }
`;

export const ComponentContainer = styled.div`
  background-color: white;
  padding: 4rem 2rem 2rem;
`;
