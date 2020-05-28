import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import { hoverLinkColor, textColor } from 'defaultStyleHelper';

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const EmptyComponentContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 40rem;
  justify-content: center;
  text-align: center;
`;

export const IconButtonContainer = styled.div`
  display: flex;
`;

export const IconButtonWrapper = styled.div`
  align-self: center;
  display: flex;
  height: fit-content;
`;

export const IssueAttempts = styled.div`
  align-self: center;
  color: #6a737d;
  margin-left: 1rem;
`;

export const IssueContent = styled.div`
  display: flex;
  height: 10rem;
  margin: 1rem 0;
  width: 100%;
`;

export const IssueContentInfo = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  flex: 100%;
`;

export const IssueDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const IssueFundedAmount = styled.div`
  align-self: center;
  color: ${textColor};
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  width: 30%;
`;

export const IssueListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const IssueModifiedDate = styled.div`
  align-self: flex-end;
  font-size: 1.2rem;
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

export const IssueOpen = styled.div`
  background-color: ${({ open }) =>
    open ? 'rgb(229, 251, 242)' : 'rgb(237, 238, 240)'};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? 'rgb(8, 178, 110)' : '0')};
  display: inline-block;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.25rem 0.4rem;
  white-space: nowrap;
`;

export const IssueOpenWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

export const IssuesList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`;

export const IssuesSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;
`;
