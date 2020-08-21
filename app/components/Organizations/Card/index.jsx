import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { FundingWrapper, LinkWrapper } from 'components/base_ui';
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
  OrganizationCardItem,
  SettingsContainer,
  StatsWrapper,
  StyledImage,
  StyledListItem,
  StyledOrganizationCard,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const issueIcon = iconDictionary('issue');

const OrganizationCard = ({ data }) => (
  <StyledOrganizationCard>
    {data.map(
      ({ description, id, issues, logo, modifiedDate, name, totalFunded }) => {
        const Component = () => (
          <StyledImage alt="Organization Image" src={logo} />
        );
        const route = `/organizations/detail/${id}`;
        return (
          <StyledListItem key={id}>
            <TitleContainer>
              <NameLink to={route}>{name}</NameLink>
              <SettingsContainer>
                <DateWrapper>
                  Last post {moment(modifiedDate).format('M/D/YYYY')}
                </DateWrapper>
              </SettingsContainer>
            </TitleContainer>
            <ContentContainer>
              <ImageContainer>
                <LinkWrapper Component={Component} detailRoute={route} />
              </ImageContainer>
              <TextContainer>
                <DescriptionWrapper>{description}</DescriptionWrapper>
                <StatsWrapper>
                  <OrganizationCardItem>
                    <IssuesWrapper>
                      <IssuesIcon>{issueIcon}</IssuesIcon>
                      <Issues>
                        {issues.length}{' '}
                        {issues.length === 1 ? `Issue` : `Issues`}
                      </Issues>
                    </IssuesWrapper>
                  </OrganizationCardItem>
                  <OrganizationCardItem>
                    <FundingWrapper
                      medium
                      open
                      value={formatDollarAmount(totalFunded)}
                    />
                  </OrganizationCardItem>
                </StatsWrapper>
              </TextContainer>
            </ContentContainer>
          </StyledListItem>
        );
      },
    )}
  </StyledOrganizationCard>
);

OrganizationCard.propTypes = { data: T.array.isRequired };

export default OrganizationCard;
