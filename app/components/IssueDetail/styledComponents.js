import styled from 'styled-components';

export const IssueDetailWrapper = styled.div`
  background-color: white;
  min-height: 40vh;
  max-width: 70rem;
  margin: 2rem 0 0 0;
  padding: 0 3rem 3rem 0;
  display: flex;
  border: 1px solid #e0e0e0;
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
  color: #37474f;
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
  /* flex-direction: column; */
`;

export const NameWrapper = styled.div`
  font-size: 1.2rem;
  max-height: 3rem;
  margin: 1rem 0 0 0;
  font-weight: bold;
`;

export const IssueDetailOverview = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem 1rem 1rem;
  width: 80%;
`;

export const IssueDetailHeader = styled.div`
  background-color: #f6f8fa;
  padding: 0.5rem;
  border: 1px solid grey;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  font-size: 0.8rem;
`;

export const IssueDetailBody = styled.div`
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;

  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;

  padding: 1rem;
`;

export const StyledImage = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #b39ddb;
  border-radius: 2rem;
  text-align: center;
`;

export const OverviewActivityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 8rem 0 0;
`;
