import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ContentContainer,
  DateWrapper,
  DescriptionWrapper,
  ImageContainer,
  Issues,
  IssuesIcon,
  IssuesWrapper,
  NameLink,
  RepoCardItem,
  SettingsContainer,
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
    {data.map(
      ({ description, id, issues, logo, modifiedDate, name, totalFunded }) => (
        <StyledListItem key={id}>
          <ImageContainer>
            <StyledImageLinkWrapper
              alt="Repo Image"
              image={logo}
              route={`/repos/detail/${id}`}
              size="8rem"
              isCircle={false}
            />
          </ImageContainer>
          <ContentContainer>
            <TitleContainer>
              <NameLink to={`/repos/detail/${id}`}>{name}</NameLink>
              <SettingsContainer>
                <DateWrapper>
                  Last post {moment(modifiedDate).format('M/D/YYYY')}
                </DateWrapper>
              </SettingsContainer>
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
      ),
    )}
  </StyledRepoCard>
);

RepoCard.propTypes = { data: T.array.isRequired };

export default RepoCard;
