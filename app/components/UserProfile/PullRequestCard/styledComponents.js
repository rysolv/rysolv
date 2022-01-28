import styled from 'styled-components';

import { darkBlueColor, grayColor, lightBlueColor } from 'defaultStyleHelper';

export const Additions = styled.div`
  color: green;
`;

export const Deletions = styled.div`
  color: red;
`;

export const IconWrapper = styled.div`
  margin-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const Label = styled.div`
  align-items: center;
  display: flex;
  padding: 0 1rem;
`;

export const PullRequestContainer = styled.a`
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  display: block;
  margin-bottom: 2rem;
  padding: 1.6rem;

  &:hover {
    * {
      color: ${lightBlueColor};
    }
    cursor: pointer;
  }
`;

export const RepoIconWrapper = styled.div`
  margin-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.div`
  padding: 1rem 0;
`;

export const TitleRow = styled.div`
  color: ${darkBlueColor};
  display: flex;
`;
