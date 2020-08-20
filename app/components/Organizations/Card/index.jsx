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
  NameWrapper,
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

const OrganizationCard = ({ data, handleNav }) => (
  <StyledOrganizationCard>
    {data.map(
      ({ description, id, issues, logo, modifiedDate, name, totalFunded }) => (
        <StyledListItem key={id}>
          <TitleContainer>
            <NameWrapper
              onClick={() => handleNav(`/organizations/detail/${id}`)}
            >
              {name}
            </NameWrapper>
            <SettingsContainer>
              <DateWrapper>
                Last post {moment(modifiedDate).format('M/D/YYYY')}
              </DateWrapper>
            </SettingsContainer>
          </TitleContainer>
          <ContentContainer>
            <ImageContainer>
              <StyledImage alt="Organization Image" src={logo} />
            </ImageContainer>
            <TextContainer>
              <DescriptionWrapper>{description}</DescriptionWrapper>
              <StatsWrapper>
                <OrganizationCardItem>
                  <IssuesWrapper>
                    <IssuesIcon>{issueIcon}</IssuesIcon>
                    <Issues>
                      {issues.length} {issues.length === 1 ? `Issue` : `Issues`}
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
      ),
    )}
  </StyledOrganizationCard>
);

OrganizationCard.propTypes = {
  data: T.array.isRequired,
  handleNav: T.func.isRequired,
};

export default OrganizationCard;
