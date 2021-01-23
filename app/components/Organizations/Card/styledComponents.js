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
  subTextColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const ContentContainer = styled.div`
  display: flex;
`;

export const DateWrapper = styled.div`
  align-self: center;
  font-size: ${detailFontSize};
  padding: 1rem;
`;

export const DescriptionWrapper = styled.div`
  font-size: ${defaultFontSize};
  padding: 1rem;
  width: 100%;

  ${mobile} {
    padding-right: 0;
  }
`;

export const ImageContainer = styled.div`
  min-width: 15%;
  text-align: center;

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
  color: ${subTextColor};
  display: flex;
  font-weight: 500;
`;

export const NameLink = styled(Link)`
  color: ${headerColor};
  font-size: ${subheaderFontSize};
  margin: 1rem;

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const OrganizationCardItem = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const SettingsContainer = styled.div`
  display: flex;
`;

export const StatsWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding: 1rem 0 1rem 1rem;
`;

export const StyledImageLinkWrapper = styled(ImageLinkWrapper)`
  margin: 1rem;
`;

export const StyledListItem = styled.li`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  color: ${textColor};
  display: flex;
  flex-direction: column;
  margin: 0 1rem 1rem 1rem;

  ${mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const StyledOrganizationCard = styled.div`
  min-height: 50rem;
`;

export const TextContainer = styled.div`
  padding: 0 3rem 0 0;
  width: 100%;

  ${mobile} {
    padding-right: 1rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
