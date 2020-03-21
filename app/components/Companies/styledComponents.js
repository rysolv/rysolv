import styled from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import { borderColor, textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const ButtonContainer = styled.div`
  align-self: center;
  padding: 1rem;
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
  align-self: center;
  display: flex;
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

export const StyledCompanyCard = styled.div`
  color: rgba(0, 0, 0, 0.7);
  width: 80%;
  margin: 0 0 0 10%;
`;

export const StyledImage = styled.img`
  height: 5rem;
  margin: 1rem;
  width: 5rem;
`;

export const StyledListItem = styled.li`
  background-color: white;
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 1rem;
  padding: 1rem 0;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: red;
  }

  background-color: red;
`;
