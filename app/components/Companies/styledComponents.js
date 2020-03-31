import styled from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import { borderColor, textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 70%;
`;

export const DateWrapper = styled.div`
  align-self: center;
  padding: 1rem;
`;

export const DescriptionWrapper = styled.div`
  font-size: 1.2rem;
  line-height: 1.5rem;
  padding: 1rem 1rem 1rem 0;
`;

export const ImageContainer = styled.div`
  text-align: center;
  min-width: 20%;
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
  font-weight: 500;
  height: 30%;
  padding: 1rem;
`;

export const SettingsContainer = styled.div`
  display: flex;
`;

export const StatsWrapper = styled.div`
  padding: 1rem 0;
`;

export const StyledCompanyCard = styled.div`
  color: rgba(0, 0, 0, 0.7);
  margin: 0 0 0 10%;
  width: 80%;
`;

export const StyledImage = styled.img`
  height: 5rem;
  margin: 1rem;
  width: 5rem;
`;

export const StyledListItem = styled.li`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: row;
  height: 13.35rem;
  height: auto;
  list-style-type: none;
  margin: 1rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: red;
  }

  background-color: red;
`;

export const StyledSettingWrapper = styled.div`
  padding: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
