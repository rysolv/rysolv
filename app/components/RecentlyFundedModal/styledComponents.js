import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';

export const ContainerTitle = styled.h3`
  border-bottom: 0.1rem solid #cfd8dc;
  color: rgba(0, 0, 0, 0.7);
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  min-height: 2rem;
  padding: 1.5rem 2%;
  padding: 1rem 2%;
  text-align: center;
  width: 100%;
`;

export const IssueAmount = styled.div`
  align-self: center;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  white-space: nowrap;
  width: 100%;
`;

export const IssueContent = styled.li`
  display: flex;
  list-style: none;
  padding: 1rem 0.5rem;
  position: relative;

  &:after {
    border-bottom: 0.1rem solid #cfd8dc;
    bottom: 0;
    content: '';
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 90%;
  }

  & :last-child {
    border-bottom: none;
  }
`;

export const IssueImage = styled.img`
  align-self: center;
  border-radius: 50%;
  height: 3.6rem;
  width: 3.6rem;
`;

export const IssueName = styled.div`
  color: #6a737d;
  font-size: 1.3rem;
`;

export const IssueTitle = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.4rem;
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IssueTitleWrapper = styled.div`
  line-height: 2rem;
  padding: 0.5rem;
  width: 65%;
`;

export const RecentlyFundedContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #cfd8dc;
  display: flex;
  flex-direction: column;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  font-size: 1.4rem;
  margin: 2rem;
`;
