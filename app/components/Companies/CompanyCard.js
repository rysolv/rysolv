import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';

import {
  ButtonContainer,
  DescriptionWrapper,
  Divider,
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
    <div>
      <StyledCompanyCard>
        {data.map(
          ({ description, id, icon, issues, name, pullRequests }, index) => (
            <div key={name}>
              <StyledListItem>
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
              <Divider isLastItem={data.length === index + 1} />
            </div>
          ),
        )}
      </StyledCompanyCard>
    </div>
  );
};

CompanyCard.propTypes = {
  data: T.array,
  handleFetchInfo: T.func,
  handleNav: T.func,
};

export default CompanyCard;
