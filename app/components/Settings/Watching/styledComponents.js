import styled from 'styled-components';

import { hoverLinkColor, textColor } from 'defaultStyleHelper';

export const IssueDetail = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 1rem 0;
`;

export const IssueFundedAmount = styled.div`
  align-self: center;
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  width: 30%;
`;

export const IssueName = styled.a`
  font-size: 1.4rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const IssueNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1.5rem;
`;

export const WatchingList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const WatchingListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;
