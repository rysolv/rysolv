import styled from 'styled-components';

import { defaultFontSize } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const DetailContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const DetailViewContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  padding: 1.6rem 0;
  width: 100%;

  ${mobile} {
    flex-direction: column;
  }
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LinksWrapper = styled.div`
  color: #6a737d;
  font-size: ${defaultFontSize};
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

export const OneLinkWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const StyledCancelIcon = styled.div`
  align-items: center;
  background-color: #ffcdd2;
  border-radius: 50%;
  color: #c62828;
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const StyledFundedIcon = styled.div`
  align-items: center;
  background-color: #c4efe0;
  border-radius: 50%;
  color: #31b589;
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const StyledGiftIcon = styled.div`
  align-items: center;
  background-color: rgb(236, 234, 252);
  border-radius: 50%;
  color: rgb(105, 8, 201);
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const StyledPullRequestIcon = styled.div`
  align-items: center;
  background-color: #fcdbc6;
  border-radius: 50%;
  color: #f47e34;
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 15px 2%;
  width: 29.453rem;

  ${mobile} {
    width: 100%;
  }
`;

export const UserContentsWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  margin: 0 2rem;
  padding: 2rem;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const UserImage = styled.img`
  height: 25rem;
  margin: 0.5rem;
  max-width: 25rem;
  object-fit: contain;

  ${mobile} {
    align-self: center;
  }
`;
