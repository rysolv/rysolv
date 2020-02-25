import React from 'react';
import T from 'prop-types';
import { PrimaryButton, ConditionalRender } from 'components/base_ui';
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

const CompanyCard = ({ data }) => {
  const hasCompanies = data.length > 0;

  const CompanyCardComponent = (
    <StyledCompanyCard>
      {data.map(({ name, image, description, issues, pullRequests }, index) => (
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
              <PrimaryButton label="Edit" />
              <PrimaryButton label="Delete" />
            </ButtonContainer>
          </StyledListItem>
          <Divider isLastItem={data.length === index + 1} />
        </div>
      ))}
    </StyledCompanyCard>
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
  data: T.array,
};

export default CompanyCard;
