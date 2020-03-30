import React, { Fragment, useState } from 'react';
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
  StyledCompanyCard,
  StyledImage,
  StyledListItem,
  StyledSettingWrapper,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const CompanyCard = ({
  data,
  handleDeleteCompany,
  handleFetchInfo,
  handleNav,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = ({ companyId }) => {
    handleDeleteCompany({ companyId });
    handleNav(`/admin/companies`);
    setAnchorEl(null);
  };

  const handleEdit = ({ companyId }) => {
    handleFetchInfo({ companyId });
    handleNav(`/admin/companies/edit`);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <StyledCompanyCard>
        {data.map(
          ({
            description,
            logo,
            id,
            issues,
            modifiedDate,
            name,
            pullRequests,
          }) => (
            <StyledListItem key={name}>
              <div>
                <TitleContainer>
                  <NameWrapper>{name}</NameWrapper>
                  <SettingsContainer>
                    <DateWrapper>
                      Last post {moment(modifiedDate).format('M/D/YYYY')}
                    </DateWrapper>
                    <StyledSettingWrapper>
                      <SettingsMenu
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={() => handleClose()}
                        handleDelete={() => handleDelete({ companyId: id })}
                        handleEdit={() => handleEdit({ companyId: id })}
                      />
                    </StyledSettingWrapper>
                  </SettingsContainer>
                </TitleContainer>
                <ContentContainer>
                  <ImageContainer>
                    <StyledImage alt="Company Image" src={logo} />
                  </ImageContainer>
                  <TextContainer>
                    <DescriptionWrapper>{description}</DescriptionWrapper>
                    <StatsWrapper>
                      {issues.length} Issues • {pullRequests} Pull Requests
                    </StatsWrapper>
                  </TextContainer>
                </ContentContainer>
              </div>
            </StyledListItem>
          ),
        )}
      </StyledCompanyCard>
    </Fragment>
  );
};

CompanyCard.propTypes = {
  data: T.array,
  handleDeleteCompany: T.func,
  handleFetchInfo: T.func,
  handleNav: T.func,
};

export default CompanyCard;
