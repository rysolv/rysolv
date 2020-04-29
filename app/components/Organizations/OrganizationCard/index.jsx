import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import SettingsMenu from 'components/SettingsMenu';
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
  StyledSettingWrapper,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const OrganizationCard = ({
  data,
  handleDeleteCompany,
  handleFetchInfo,
  handleNav,
}) => {
  const deleteRoute = `/admin/organizations`;
  const editRoute = `/admin/organizations/edit`;
  return (
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
                  onClick={() => handleNav(`/admin/organizations/detail/${id}`)}
                >
                  {name}
                </NameWrapper>
                <SettingsContainer>
                  <DateWrapper>
                    Last post {moment(modifiedDate).format('M/D/YYYY')}
                  </DateWrapper>
                  <StyledSettingWrapper>
                    <SettingsMenu
                      deleteRoute={deleteRoute}
                      editRoute={editRoute}
                      handleDelete={handleDeleteCompany}
                      handleFetchInfo={handleFetchInfo}
                      handleNav={handleNav}
                      id={id}
                    />
                  </StyledSettingWrapper>
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
};

OrganizationCard.propTypes = {
  data: T.array,
  handleDeleteCompany: T.func,
  handleFetchInfo: T.func,
  handleNav: T.func,
};

export default OrganizationCard;
