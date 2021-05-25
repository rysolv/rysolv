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
  align-content: space-between;
  align-self: normal;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  margin-left: 1rem;
  width: 100%;
`;

export const DescriptionWrapper = styled.div`
  font-size: ${defaultFontSize};
  width: 100%;

  ${mobile} {
    padding-right: 0;
  }
`;

export const ImageContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 8rem;
  max-width: 8rem;
  min-width: 15%;
  width: 8rem;

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

export const StatsWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
`;

export const StyledImageLinkWrapper = styled(ImageLinkWrapper)`
  border-radius: 0.8rem;
`;

export const StyledListItem = styled.li`
  align-content: space-between;
  align-items: safe center;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  color: ${textColor};
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: safe center;
  margin: 0 1rem 1rem 1rem;
  padding: 2rem;

  ${mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const StyledRepoCard = styled.div`
  min-height: 50rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
