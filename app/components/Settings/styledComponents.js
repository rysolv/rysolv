import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { BaseDropDownMenu, ErrorSuccessBanner } from 'components/base_ui';
import {
  commentHeaderColor,
  defaultFontSize,
  hoverLinkColor,
  subTextLightGrey,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
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
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
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

export const SettingsViewContainer = styled.div`
  background-color: white;
  padding: 4rem 2rem 2rem;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin-left: 1rem;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-top: 1.6rem;
  width: 100%;
`;

export const StyledH3 = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: ${({ removeMarginTop }) => (removeMarginTop ? '0 0 3rem' : '3rem 0')};
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
  flex: 1;
  font-size: ${defaultFontSize};
  min-width: fit-content;
  padding: 0.6rem;

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

  .indicator {
    display: none;
  }

  .scrollButtons {
    &.Mui-disabled {
      opacity: 0.3;
    }
  }

  svg {
    color: ${textColor};
    font-size: 2rem;
  }

  ${mobile} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
    margin-top: 0;
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
