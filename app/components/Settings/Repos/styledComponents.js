import styled from 'styled-components';

import {
  hoverLinkColor,
  subTextLightGrey,
  textColor,
  verifyBackgroundColor,
  verifyColor,
} from 'defaultStyleHelper';

export const IconButtonWrapper = styled.div`
  align-self: center;
  display: flex;
  height: fit-content;
`;

export const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding-left: 1.5rem;
`;

export const RepoContent = styled.div`
  display: flex;
  height: auto;
  margin: 1rem 0;
  width: 100%;
`;

export const RepoContentInfo = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  flex: 100%;
`;

export const RepoDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding-left: 1rem;
  width: 100%;
`;

export const RepoFundedAmount = styled.div`
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

export const RepoFundedWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
`;

export const RepoIssues = styled.div`
  align-self: center;
  color: ${subTextLightGrey};
`;

export const RepoListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const RepoModifiedDate = styled.div`
  align-self: flex-end;
  font-size: 1.2rem;
`;

export const RepoName = styled.a`
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const ReposList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`;

export const StyledImage = styled.img`
  height: 4rem;
  width: 4rem;
`;
