import styled from 'styled-components';

import { defaultFontSize } from 'defaultStyleHelper';

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailListItem = styled.div`
  display: flex;
  flex-flow: wrap;
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
`;

export const DetailViewContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: row;
  padding: 1.6rem 0;
  width: 100%;
`;

export const DetailsPanel = styled.div`
  color: #6a737d;
  align-self: flex-end;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const DetailsPanelWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

export const Divider = styled.div`
  background: #00eb93;
  border-radius: 0.6rem;
  display: block;
  height: 0.4rem;
  width: 100%;
`;

export const Language = styled.div`
  background-color: #e8f0fa;
  border-radius: 0.25rem;
  color: #6487ae;
  font-size: 1.1rem;
  margin: 0 1rem 1rem 0;
  padding: 0.5rem;
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

export const OnlineIcon = styled.div`
  align-items: center;
  color: #0fce7c;
  display: flex;
  margin-right: 0.25rem;
`;

export const OnlineWrapper = styled.div`
  display: flex;
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const StyledUserBarTitle = styled.div`
  font-size: 1.8rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 20rem;
`;

export const UserDetails = styled.div`
  padding: 0.5rem;
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  padding: 15px 2%;
  width: fit-content;
`;

export const UserContentsWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  margin: 0 2rem;
  padding: 2rem;
  width: 100%;
`;

export const UserImage = styled.img`
  margin: 0.5rem;
  max-height: 25rem;
  max-width: 25rem;
`;

export const UserMetricsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
