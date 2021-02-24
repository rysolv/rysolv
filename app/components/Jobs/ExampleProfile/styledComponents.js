import styled from 'styled-components';

import {
  borderColor,
  languageBackground,
  languageText,
  primaryButtonColor,
} from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, tablet, mobile } = mediaQueriesByDevice;

export const IconContainer = styled.div`
  width: 3rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const InfoContainer = styled.div`
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

export const LanguageIcon = styled.div`
  margin-right: 1rem;

  svg {
    height: 3rem;
    width: 3rem;
  }
  ${mobile} {
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
`;

export const LanguageStats = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
  ${mobile} {
    font-size: 1.4rem;
  }
`;

export const LanguageWrapper = styled.div`
  align-items: center;
  background-color: ${languageBackground};
  border-radius: 0.5rem;
  color: ${languageText};
  display: inline-flex;
  padding: 0.5rem 1rem;
`;

export const Name = styled.div`
  color: ${primaryButtonColor};
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  ${laptop} {
    align-items: center;
    flex-direction: column;
  }
`;

export const ProfileImage = styled.div`
  background-image: url('https://rysolv.s3.us-east-2.amazonaws.com/default-profile-picture.png');
  background-size: contain;
  border-radius: 50%;
  height: 8rem;
  margin: 0 1rem 0;
  width: 8rem;
`;

export const ProfileImageContainer = styled.div`
  align-self: center;
`;

export const Stats = styled.div`
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
`;

export const Title = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const UserContainer = styled.div`
  align-self: center;
  border-radius: 1rem;
  border: 0.2rem solid ${borderColor};
  display: flex;
  padding: 1rem 1rem 0 1rem;
  width: 48%;
  ${laptop} {
    width: 70%;
  }
  ${tablet} {
    width: 100%;
  }
`;
