import styled from 'styled-components';

import { borderColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BottomFade = styled.div`
  height: 15rem;
  width: 100%;
  margin-top: -15rem;
  z-index: 99;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 90%
  );
`;

export const Contribution = styled.div`
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  width: 80%;
  padding: 1rem;
  align-items: center;
  flex-direction: column;
  margin-top: 0.5rem;

  ${mobile} {
    width: 100%;
  }
`;

export const ContributionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GithubLink = styled.div`
  display: inline-flex;
  font-size: 1.4rem;
  ${mobile} {
    display: none;
  }
`;

export const Info = styled.div`
  display: flex;
  font-size: 1.4rem;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 1.5rem 0 0 0;
`;

export const InfoIcon = styled.div`
  margin-right: 0.5rem;
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const ProjectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectName = styled.div`
  color: ${({ color }) => color};
  font-size: 2.5rem;
  display: inline-flex;
  align-items: center;
  ${mobile} {
    font-size: 1.8rem;
  }
`;

export const ProjectLogo = styled.div`
  svg {
    height: 4rem;
    width: 4rem;
  }
  ${mobile} {
    svg {
      height: 3rem;
      width: 3rem;
    }
  }
`;
