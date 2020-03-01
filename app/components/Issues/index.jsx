import React from 'react';
import T from 'prop-types';
import AdminSubHeader from 'components/Admin/AdminSubHeader';
import {
  ConditionalRender,
  ErrorSuccessBanner,
  Settings,
  IconToolTip,
  Upvote,
  Comments,
  Verified,
} from 'components/base_ui';
import {
  BannerWrapper,
  StyledIssueCard,
  NameWrapper,
  DollarWrapper,
  StyledListItem,
  StyledIssueHeader,
  IssueLanguage,
  IssueOverview,
  StyledIssueContent,
  StyledIssueText,
  StyledIssueFooter,
  OrganizationNameWrapper,
  UpvotePanel,
} from './styledComponents';

const IssueCard = ({
  alerts: { error, success },
  clearAlerts,
  data,
  // handleDelete,
  // handleNav,
}) => {
  const hasCompanies = data.length > 0;

  const IssueCardComponent = (
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
        {data.map(({ id, name, overview, language, solved }) => (
          <div key={id}>
            <StyledListItem>
              <UpvotePanel>
                <Upvote />
                <div>1</div>
                <div>5</div>
                <div>10</div>
                <div>?</div>
              </UpvotePanel>
              <StyledIssueContent>
                <StyledIssueHeader>
                  <OrganizationNameWrapper>
                    Flutter{'  '}
                    <IconToolTip toolTipText="Verified Contributor">
                      <div>
                        <Verified />
                      </div>
                    </IconToolTip>
                  </OrganizationNameWrapper>

                  <IssueLanguage>{language}</IssueLanguage>

                  <Settings />
                </StyledIssueHeader>
                <StyledIssueText>
                  <NameWrapper>{name}</NameWrapper>
                  <IssueOverview>{overview}</IssueOverview>
                </StyledIssueText>
                <StyledIssueFooter>
                  <div>
                    <Comments /> 3 comments
                  </div>
                  <div>{solved ? 'Resolved' : '2 Attempts'}</div>
                  <div>22 Watch</div>
                  <DollarWrapper>$35.00</DollarWrapper>
                </StyledIssueFooter>
              </StyledIssueContent>
            </StyledListItem>
          </div>
        ))}
      </StyledIssueCard>
    </div>
  );
  return (
    <ConditionalRender
      Component={IssueCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasCompanies}
    />
  );
};

IssueCard.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  // handleDelete: T.func,
  // handleNav: T.func,
};

export default IssueCard;
