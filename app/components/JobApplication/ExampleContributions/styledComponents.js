import styled from 'styled-components';

import { borderColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptopS, mobile } = mediaQueriesByDevice;

export const Contribution = styled.div`
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  margin-top: 0.5rem;
  padding: 1rem;
  width: 80%;

  ${laptopS} {
    width: 100%;
  }
`;

export const ContributionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  ${mobile} {
    display: none;
  }
`;

export const GithubLink = styled.div`
  display: block;
  margin-left: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    display: inline-block;
    height: 2rem;
    margin-right: 0.5rem;
    width: 2rem;
  }

  ${mobile} {
    display: none;
  }
`;

export const Info = styled.div`
  align-items: center;
  display: flex;
  text-align: left;

  svg {
    display: inline-block;
    height: 2rem;
    margin-right: 0.5rem;
    width: 2rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 0;
`;

export const ProjectContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const ProjectName = styled.div`
  align-items: center;
  color: ${({ color }) => color};
  display: inline-flex;
  font-size: 2rem;
  white-space: nowrap;

  svg {
    height: 3rem;
    margin-right: 1rem;
    width: 3rem;
  }

  ${mobile} {
    font-size: 1.8rem;
  }
`;
