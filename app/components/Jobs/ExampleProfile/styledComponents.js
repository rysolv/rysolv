import styled from 'styled-components';

import {
  borderColor,
  languageBackground,
  languageText,
  lightBlueColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, tablet } = mediaQueriesByDevice;

export const InfoContainer = styled.div`
  text-align: left;
  width: 100%;
`;

export const LanguageContainer = styled.div`
  width: 48%;

  ${laptop} {
    width: 70%;
  }

  ${tablet} {
    width: 100%;
  }
`;

export const LanguageStats = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const Language = styled.div`
  align-items: center;
  background-color: ${languageBackground};
  border-radius: 0.5rem;
  color: ${languageText};
  display: inline-flex;
  padding: 0.5rem 1rem;

  svg {
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
  }
`;

export const Name = styled.div`
  color: ${lightBlueColor};
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${laptop} {
    align-items: center;
    flex-direction: column;
  }
`;

export const StyledImage = styled.img`
  align-self: center;
  border-radius: 50%;
  height: 8rem;
  margin: 0 1rem 0;
  width: 8rem;

  @media (max-width: 415px) {
    height: 6rem;
    margin-bottom: 1rem;
    width: 6rem;
  }
`;

export const Stats = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const Title = styled.div`
  align-items: center;
  display: inline-flex;

  svg {
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
  }
`;

export const UserContainer = styled.div`
  border-radius: 1rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  padding: 1rem 1rem 0 1rem;
  width: 48%;

  ${laptop} {
    width: 70%;
  }

  ${tablet} {
    width: 100%;
  }

  @media (max-width: 415px) {
    flex-direction: column;
  }
`;
