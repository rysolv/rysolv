import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const DescriptionWrapper = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`;

export const ImageContainer = styled.div`
  align-self: center;
  text-align: center;
  width: 20%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-grow: 8;
  flex-direction: column;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  justify-content: center;
  text-align: center;
`;

export const NameWrapper = styled.div`
  font-size: 1.2rem;
`;

export const StyledImage = styled.img`
  height: 5rem;
  width: 5rem;
`;

export const StyledUserCard = styled.div`
  border-radius: 0 0.5rem 0.5rem;
  border: 0.1rem solid grey;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
`;

export const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const StyledSettingWrapper = styled.div`
  padding: 1rem;
`;
