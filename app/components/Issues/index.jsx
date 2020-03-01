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
  StyledIssueCard,
  StyledImage,
  IssueResolved,
  StyledListItem,
  StyledLanguage,
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
      <StyledIssueCard>
        {data.map(
          ({ id, name, overview, language, languageLogo, solved }, index) => (
            <div key={name}>
              <StyledListItem>
                <ImageContainer>
                  <StyledImage alt={language} src={languageLogo} />
                  <StyledLanguage>{language}</StyledLanguage>
                  <IssueResolved>
                    {solved ? 'Resolved' : 'Not Resolved'}
                  </IssueResolved>
                </ImageContainer>
                <InfoContainer>
                  <NameWrapper>{name}</NameWrapper>
                  <DescriptionWrapper>{overview}</DescriptionWrapper>
                </InfoContainer>
                <ButtonContainer>
                  <PrimaryButton
                    label="Edit"
                    onClick={() => handleNav(`/admin/issue/${id}`)}
                  />
                  <StyledPrimaryAsyncButton
                    label="Delete"
                    onClick={() => handleDelete({ issueId: id })}
                  />
                </ButtonContainer>
              </StyledListItem>
              <Divider isLastItem={data.length === index + 1} />
            </div>
          ),
        )}
      </StyledIssueCard>
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
