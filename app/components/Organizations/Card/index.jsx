import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ContentContainer,
  DateWrapper,
  DescriptionWrapper,
  ImageContainer,
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

const OrganizationCard = ({ data, handleNav }) => (
  <Fragment>
    <StyledOrganizationCard>
      {data.map(
        ({
          description,
          id,
          issues,
          logo,
          modifiedDate,
          name,
          totalFunded,
        }) => (
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
                    {issues.length} Issues
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
  </Fragment>
);

OrganizationCard.propTypes = {
  data: T.array,
  handleNav: T.func,
};

export default OrganizationCard;
