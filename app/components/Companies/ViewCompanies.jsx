import React from 'react';
import T from 'prop-types';
import { ConditionalRender, PrimaryButton } from 'components/base_ui';
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
  StyledPrimaryAsyncButton,
} from './styledComponents';

const CompanyCard = ({ data, handleDelete, handleNav }) => {
  const hasCompanies = data.length > 0;

  const CompanyCardComponent = (
    <div>
      <StyledCompanyCard>
        {data.map(
          ({ description, id, image, issues, name, pullRequests }, index) => (
            <div key={name}>
              <StyledListItem>
                <ImageContainer>
                  <StyledImage alt="Company Image" src={image} />
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
                    onClick={() => handleNav(`/admin/companies/edit/${id}`)}
                  />
                  <StyledPrimaryAsyncButton
                    label="Delete"
                    onClick={() => handleDelete({ companyId: id })}
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
  return (
    <ConditionalRender
      Component={CompanyCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasCompanies}
    />
  );
};

CompanyCard.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  data: T.array,
  handleDelete: T.func,
  handleNav: T.func,
};

export default CompanyCard;
