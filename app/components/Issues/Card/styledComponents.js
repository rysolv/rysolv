import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IconButton, Verified } from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  selectedColor,
  subheaderFontSize,
  subTextGrey,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const IssueCardIconWrapper = styled.div`
  display: flex;
  margin: 0 0.25rem;
`;

export const IssueCardItem = styled.div`
  align-items: center;
  color: ${subTextGrey};
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1;
  padding-right: 1rem;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const IssueCardLabelWrapper = styled.div`
  display: inline-flex;
`;

export const IssueFooterIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IssueLanguageContainer = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  margin: 1rem 0;
`;

export const MobileIconDescription = styled.div`
  padding-left: 0.25rem;
`;

export const NameLink = styled(Link)`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  overflow: hidden;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }

  ${mobile} {
    font-size: ${defaultFontSize};
  }
`;

export const NameWrapper = styled.div`
  margin: 1rem 0;
`;

export const RepoNameWrapper = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-weight: bold;

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const StyledIconButton = styled(
  ({ isWatching, shouldBold, ...restProps }) => <IconButton {...restProps} />,
)`
  color: ${({ isWatching }) => (isWatching ? selectedColor : subTextGrey)};
  font-weight: 700;
  padding-right: 1rem;
  stroke: ${({ shouldBold }) => (shouldBold ? 'currentColor' : 'none')};
`;

export const StyledIssueCard = styled.div`
  min-height: ${({ height }) => `${height}px` || '50rem'};
`;

export const StyledIssueContent = styled.div`
  background-color: white;
  border-bottom-right-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  border: 1px solid #e0e0e0;
  padding: 0.5rem;
  width: 100%;
`;

export const StyledIssueFooter = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  justify-content: ${props => (props.open ? 'space-between' : 'flex-end')};
  padding: 0.5rem 1rem 0.25rem 0;
`;

export const StyledIssueHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding: 0.25rem 1rem 0 0;
  width: 100%;
`;

export const StyledIssueText = styled.div`
  height: auto;
  min-height: 6rem;
  padding: 0 1rem 0 0;
`;

export const StyledListItem = styled.li`
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0 1rem 1rem 1rem;
  overflow: hidden;

  ${mobile} {
    margin: 0 0 1rem 0;
  }
`;

export const StyledVerified = styled(Verified)`
  margin: 0 0.5rem;
`;
