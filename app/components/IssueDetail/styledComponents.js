import styled from 'styled-components';

import {
  issueBorder,
  textColor,
  darkTextColor,
  moneyGreen,
} from 'defaultStyleHelper';
import { FlatIconButton } from '../base_ui';

export const IssueDetailWrapper = styled.div`
  background-color: white;
  min-height: 40vh;
  max-width: 75rem;
  margin: 2rem 0 0 0;
  padding: 0 3rem 3rem 0;
  display: flex;
  border: ${issueBorder};
  border-radius: 2px;
`;

export const LeftPanel = styled.div`
  width: 3rem;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  width: 100%;
  padding: 0.5rem;
  height: 15rem;
  text-align: center;
`;

export const IssueDetailTopBar = styled.div`
  width: 100%;
  flex: 100%;
  padding: 1rem 3rem 0 3rem;
`;

export const StyledIssueHeader = styled.div`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
`;

export const OrganizationNameWrapper = styled.div`
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

export const IssueDetailColumn = styled.div`
  padding: 1rem 3rem 3rem 3rem;
  display: flex;
  flex-direction: column;
`;

export const NameWrapper = styled.div`
  font-size: 1.4rem;
  max-height: 3rem;
  margin: 1rem 0 1rem 0;
  font-weight: bold;
  color: ${darkTextColor};
`;

export const IssueResolved = styled.div`
  color: white;
  font-weight: bold;
  background-color: ${({ solved }) => (solved ? moneyGreen : 'gray')};
  border: 2px solid #b9f6ca;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 5rem;
`;

export const DollarWrapper = styled.div`
  color: white;
  background-color: ${moneyGreen};
  padding: 0.25rem 1rem 0.25rem 1rem;
  border-radius: 1rem;
  text-align: center;
`;

export const IssueSubHeader = styled.div`
  display: flex;
  align-items: center;

  justify-content: flex-start;
`;

export const IssueSubItem = styled.div`
  margin: 0 1rem 0 1rem;
  color: ${textColor};
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;
