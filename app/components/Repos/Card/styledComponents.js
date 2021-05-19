import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ImageLinkWrapper } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  headerColor,
  hoverLinkColor,
  subheaderFontSize,
  subTextGrey,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-content: space-between;
  align-self: normal;
  gap: 1rem;
`;

export const DateWrapper = styled.div`
  align-self: center;
  font-size: ${detailFontSize};
`;

export const DescriptionWrapper = styled.div`
  font-size: ${defaultFontSize};
  width: 100%;

  ${mobile} {
    padding-right: 0;
  }
`;

export const ImageContainer = styled.div`
  width: 8rem;
  max-width: 8rem;
  max-height: 8rem;
  min-width: 15%;
  ${mobile} {
    min-width: 20%;
  }
`;

export const Issues = styled.div``;

export const IssuesIcon = styled.div`
  padding-right: 0.25rem;
`;

export const IssuesWrapper = styled.div`
  align-items: center;
  color: ${subTextGrey};
  display: flex;
  font-weight: 500;
`;

export const NameLink = styled(Link)`
  color: ${headerColor};
  font-size: ${subheaderFontSize};

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const RepoCardItem = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const SettingsContainer = styled.div`
  display: flex;
`;

export const StatsWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
`;

export const StyledImageLinkWrapper = styled(ImageLinkWrapper)`
  border-radius: 0.8rem;
`;

export const StyledListItem = styled.li`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  color: ${textColor};
  display: flex;
  flex-direction: row;
  margin: 0 1rem 1rem 1rem;
  justify-content: safe center;
  align-items: safe center;
  align-content: space-between;
  padding: 2rem;
  gap: 1rem;
  ${mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const StyledRepoCard = styled.div`
  min-height: 50rem;
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
