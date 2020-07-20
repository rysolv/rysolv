import styled from 'styled-components';

import IssueButtonBar from '../IssueButtonBar';

export const IssueBarTopRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IssueBarBottomRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const StyledIssueButtonBar = styled(IssueButtonBar)`
  flex-wrap: nowrap;
  width: 100%;
`;

export const StyledIssueHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
`;
