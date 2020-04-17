import styled from 'styled-components';

import {
  borderColor,
  darkTextColor,
  moneyGreen,
  textColor,
} from 'defaultStyleHelper';
import { FlatIconButton } from '../base_ui';

export const IssueDetailWrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  margin: 0;
  max-width: 75rem;
  min-height: 40vh;
  overflow: hidden;
  padding: 0 3rem 3rem 0;
`;

export const LeftPanel = styled.div`
  width: 3rem;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  height: 15rem;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
`;

export const IssueDetailTopBar = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  margin: 0 0 0 0;
  padding: 0.5rem 0;
`;

export const StyledIssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  width: 100%;
`;

export const OrganizationNameWrapper = styled.div`
  color: ${textColor};
  display: flex;
  display: inline-block;
  font-weight: bold;
`;

export const IssueLanguage = styled.div`
  color: #90a4ae;
  display: flex;
  display: inline-block;
  font-weight: bold;
`;

export const IssueDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
`;

export const NameWrapper = styled.div`
  color: ${darkTextColor};
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0.5rem;
  max-height: 3rem;
`;

export const IssueResolved = styled.div`
  background-color: ${props => (props.open ? moneyGreen : 'grey')};
  border-color: ${props => (props.open ? '#b9f6ca' : 'grey')};
  border-radius: 5rem;
  border: 2px solid;
  color: white;
  display: inline-block;
  font-weight: bold;
  padding: 0.5rem;
`;

export const DollarWrapper = styled.div`
  background-color: ${moneyGreen};
  border-radius: 1rem;
  color: white;
  padding: 0.25rem 1rem 0.25rem 1rem;
  text-align: center;
`;

export const IssueSubHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IssueSubItem = styled.div`
  color: ${textColor};
  margin: 0 1rem 0 1rem;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  min-width: 0;
  padding: 0;
`;

export const Divider = styled.div`
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  font-family: inherit;
  margin: '1rem 0';
  width: 100%;
`;
