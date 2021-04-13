import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  subTextLightGrey,
  textColor,
  verifyBackgroundColor,
  verifyColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const IssueAttempts = styled.div`
  align-self: center;
  color: ${subTextLightGrey};
  margin-left: 1rem;
`;

export const IssueContent = styled.div`
  display: flex;
  height: 10rem;
  margin: 1rem 0;
  width: 100%;

  ${mobile} {
    height: auto;
  }
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
  white-space: nowrap;
  width: 30%;
`;

export const IssueListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 100%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const IssueModifiedDate = styled.div`
  align-self: flex-end;
  font-size: ${detailFontSize};
`;

export const IssueName = styled.a`
  font-size: ${defaultFontSize};

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
    open ? verifyBackgroundColor : 'rgb(237, 238, 240)'};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? verifyColor : '0')};
  display: inline-block;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.25rem 0.4rem;
  white-space: nowrap;
`;

export const IssueOpenWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
`;

export const IssuesList = styled.ul`
  padding: 0 2rem;
`;

export const IssuesSearchHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 2rem;
  width: 100%;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin-left: 1rem;

  ${mobile} {
    margin: 0;
  }
`;
