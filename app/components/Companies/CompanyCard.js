import React, { Fragment } from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';

import {
  ButtonContainer,
  DescriptionWrapper,
  ImageContainer,
  InfoContainer,
  NameWrapper,
  StyledCompanyCard,
  StyledImage,
  StyledListItem,
} from './styledComponents';

const CompanyCard = ({ data, handleFetchInfo, handleNav }) => {
  const handleEdit = ({ companyId }) => {
    handleFetchInfo({ companyId });
    handleNav(`/admin/companies/edit`);
  };

  return (
    <Fragment>
      <StyledCompanyCard>
        {data.map(({ description, id, icon, issues, name, pullRequests }) => (
          <StyledListItem key={name}>
            <ImageContainer>
              <StyledImage alt="Company Image" src={icon} />
            </ImageContainer>
            <InfoContainer>
              <NameWrapper>{name}</NameWrapper>
              <DescriptionWrapper>{description}</DescriptionWrapper>
              <div>
                {issues} Issues • {pullRequests} Pull Requests
              </div>
            </InfoContainer>
            <ButtonContainer>
              <PrimaryButton
                label="Edit"
                onClick={() => handleEdit({ companyId: id })}
              />
            </ButtonContainer>
          </StyledListItem>
        ))}
      </StyledCompanyCard>
    </Fragment>
  );
};

CompanyCard.propTypes = {
  data: T.array,
  handleFetchInfo: T.func,
  handleNav: T.func,
};

export default CompanyCard;
