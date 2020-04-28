import styled from 'styled-components';
import {
  hoverLinkColor,
  textColor,
  defaultFontSize,
  subheaderFontSize,
  detailFontSize,
} from 'defaultStyleHelper';
import { FlatIconButton, FundingWrapper } from '../base_ui';

export const StyledFundingWrapper = styled(FundingWrapper)`
  font-size: ${subheaderFontSize};
`;

export const IssueCardWrapper = styled.div`
  width: 70%;
`;

export const IssuesWrapper = styled.div`
  display: flex;
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
  justify-content: ${props => (props.open ? 'space-between' : 'flex-end')};
  font-size: ${detailFontSize};
  color: ${textColor};
  padding: 0.5rem 3rem 0.25rem 0;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const IssueCardItem = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const IssueCardIconWrapper = styled.div`
  display: inline-flex;
  margin: 0 0.5rem;
`;

export const IssueCardLabelWrapper = styled.div`
  display: inline-flex;
`;
