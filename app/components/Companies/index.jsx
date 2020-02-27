import React from 'react';
import T from 'prop-types';
import AdminSubHeader from 'components/Admin/AdminSubHeader';
import {
  ConditionalRender,
  ErrorSuccessBanner,
  PrimaryButton,
} from 'components/base_ui';
import {
  BannerWrapper,
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

const CompanyCard = ({
  alerts: { error, success },
  clearAlerts,
  data,
  handleDelete,
  handleNav,
}) => {
  const hasCompanies = data.length > 0;

  const CompanyCardComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
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
                    onClick={() => handleNav(`/admin/company/${id}`)}
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
  clearAlerts: T.func,
  data: T.array,
  handleDelete: T.func,
  handleNav: T.func,
};

export default CompanyCard;
