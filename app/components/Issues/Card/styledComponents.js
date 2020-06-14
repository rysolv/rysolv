import styled from 'styled-components';

import {
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const IssueCardIconWrapper = styled.div`
  display: inline-flex;
  margin: 0 0.5rem;
`;

export const IssueCardItem = styled.div`
  align-items: center;
  display: inline-flex;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const IssueCardLabelWrapper = styled.div`
  display: inline-flex;
`;

export const IssueLanguageContainer = styled.div`
  margin: 1rem 0;
  font-size: ${detailFontSize};
`;

export const NameWrapper = styled.a`
  font-size: ${subheaderFontSize};
  overflow: hidden;
  color: ${textColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const OrganizationNameWrapper = styled.a`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-weight: bold;
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
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  justify-content: ${props => (props.open ? 'space-between' : 'flex-end')};
  padding: 0.5rem 1rem 0.25rem 0;
`;

export const StyledIssueHeader = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding: 0.25rem 1rem 0 0.25rem;
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
`;
