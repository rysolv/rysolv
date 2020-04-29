import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import SettingsMenu from 'components/SettingsMenu';

import {
  ContentContainer,
  DateWrapper,
  DescriptionWrapper,
  ImageContainer,
  NameWrapper,
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
  const deleteRoute = `/admin/companies`;
  const editRoute = `/admin/companies/edit`;
  return (
    <Fragment>
      <StyledOrganizationCard>
        {data.map(({ description, logo, id, issues, modifiedDate, name }) => (
          <StyledListItem key={id}>
            <div>
              <TitleContainer>
                <NameWrapper
                  onClick={() => handleNav(`/admin/companies/detail/${id}`)}
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
                  <StatsWrapper>{issues.length} Issues</StatsWrapper>
                </TextContainer>
              </ContentContainer>
            </div>
          </StyledListItem>
        ))}
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
