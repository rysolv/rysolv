import React from 'react';
import T from 'prop-types';

import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ContentContainer,
  DescriptionWrapper,
  ImageContainer,
  Issues,
  IssuesIcon,
  IssuesWrapper,
  NameLink,
  RepoCardItem,
  StatsWrapper,
  StyledImageLinkWrapper,
  StyledListItem,
  StyledRepoCard,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const issueIcon = iconDictionary('issue');

const RepoCard = ({ data }) => (
  <StyledRepoCard>
    {data.map(({ description, id, issues, logo, name, totalFunded }) => (
      <StyledListItem key={id}>
        <ImageContainer>
          <StyledImageLinkWrapper
            alt="Repo Image"
            image={logo}
            isCircle={false}
            route={`/repos/detail/${id}`}
            size="8rem"
          />
        </ImageContainer>
        <ContentContainer>
          <TitleContainer>
            <NameLink to={`/repos/detail/${id}`}>{name}</NameLink>
          </TitleContainer>
          <TextContainer>
            <DescriptionWrapper>{description}</DescriptionWrapper>
            <StatsWrapper>
              <RepoCardItem>
                <IssuesWrapper>
                  <IssuesIcon>{issueIcon}</IssuesIcon>
                  <Issues>
                    {issues.length} {issues.length === 1 ? `Issue` : `Issues`}
                  </Issues>
                </IssuesWrapper>
              </RepoCardItem>
              <RepoCardItem>
                <FundingWrapper
                  medium
                  open
                  value={formatDollarAmount(totalFunded)}
                />
              </RepoCardItem>
            </StatsWrapper>
          </TextContainer>
        </ContentContainer>
      </StyledListItem>
    ))}
  </StyledRepoCard>
);

RepoCard.propTypes = { data: T.array.isRequired };

export default RepoCard;
