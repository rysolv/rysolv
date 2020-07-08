import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

export const Icon = styled.span`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const IssueFundedAmount = styled.div`
  align-self: center;
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  white-space: nowrap;
  width: 30%;
`;

export const IssueMerged = styled.div`
  background-color: ${({ merged }) =>
    merged ? 'rgb(236, 234, 252)' : 'rgb(229,251,242)'};
  border-radius: 0.25rem;
  color: ${({ merged }) => (merged ? 'rgb(105, 8, 201)' : 'rgb(8,178,110)')};
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  margin-right: 2rem;
  padding: 0.25rem 0.4rem;
  white-space: nowrap;
`;

export const PullRequestCardContainer = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const PullRequestContent = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

export const PullRequestDateWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: flex-end;
  width: 100%;
`;

export const PullRequestListItem = styled.li`
  align-items: center;
  border-top: 0.1rem solid #d5d5d5;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 1rem 0;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
`;

export const StyledItem = styled.div`
  margin: 0.5rem 0;
`;

export const StyledLabel = styled.span`
  font-weight: bold;
`;

export const TestIconContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const TestIconWrapper = styled.div`
  background: ${({ isMergeable }) =>
    isMergeable ? 'rgb(229,251,242)' : '#ffcdd2'};
  border-radius: 0.2rem;
  color: ${({ isMergeable }) => (isMergeable ? 'rgb(8,178,110)' : '#b71c1c')};
  display: flex;
  height: 1.5rem;
  margin-right: 0.7rem;
  width: 1.5rem;
`;

export const TitleWrapper = styled.div`
  padding-top: 1.5rem;
`;

export const UrlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 1.5rem 0;
  width: 80%;
`;

export const UrlWrapper = styled.a`
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    color: #007bff;
    cursor: pointer;
  }
`;
