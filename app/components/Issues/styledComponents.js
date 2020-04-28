import styled from 'styled-components';
import {
  hoverLinkColor,
  textColor,
  defaultFontSize,
  subheaderFontSize,
  detailFontSize,
} from 'defaultStyleHelper';
import { FlatIconButton } from '../base_ui';

export const IssueCardWrapper = styled.div`
  width: 70%;
`;

export const IssuesWrapper = styled.div`
  display: flex;
  width: 90%;
  padding: 0 5%;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  height: 55rem;
  justify-content: center;
  text-align: center;
`;

export const StyledListItem = styled.li`
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  margin: 1rem;
  flex-direction: row;
  list-style-type: none;
`;

export const StyledIssueContent = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 0.2rem;
`;

export const StyledIssueHeader = styled.div`
  width: 100%;
  font-size: ${detailFontSize};

  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
`;

export const OrganizationNameWrapper = styled.a`
  display: flex;
  color: ${textColor};
  display: inline-block;
  font-weight: bold;
`;

export const IssueLanguage = styled.div`
  display: flex;
  color: #90a4ae;
  font-weight: bold;
  display: inline-block;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  width: 3rem;
  font-size: ${defaultFontSize};
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.2rem;
`;

export const StyledIssueText = styled.div`
  padding: 0 1rem 0 0;
  height: auto;
  min-height: 6rem;
`;

export const NameWrapper = styled.a`
  font-size: ${subheaderFontSize};
  max-height: 3rem;
  overflow: hidden;
  color: ${textColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const BannerWrapper = styled.div`
  font-size: ${defaultFontSize};
  margin: 1rem 0;
`;

export const IssueResolved = styled.div`
  color: red;
`;

export const StyledIssueFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${detailFontSize};
  align-items: center;
  padding: 0.5rem 3rem 0.25rem 0;
  width: 100%;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const DollarWrapper = styled.div`
  background-color: rgb(229, 251, 242);
  border-radius: 0.25rem;
  color: rgb(8, 178, 110);
  display: inline-block;
  font-size: ${defaultFontSize};
  font-weight: 700;
  line-height: 1.5;
  min-width: 5rem;
  padding: 0.25rem 0.4rem;
  text-align: center;
  white-space: nowrap;
  width: auto;
`;
