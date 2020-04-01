import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import {
  ConditionalRender,
  ErrorSuccessBanner,
  IconToolTip,
  Upvote,
  CommentIcon,
  Verified,
} from 'components/base_ui';
import SettingsMenu from 'components/SettingsMenu';

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
  handleDeleteIssue,
  handleNav,
  disabled,
  handleInputChange,
  handleSearchIssues,
  search,
}) => {
  const deleteRoute = `/admin/issues`;
  const hasCompanies = data.length > 0;
  const IssueCardComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader
          disabled={disabled}
          handleInputChange={handleInputChange}
          handleSearch={handleSearchIssues}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <StyledIssueCard>
        {data.map(
          ({
            id,
            name,
            organizationName,
            organizationVerified,
            language,
            body,
            attempts,
            rep,
            watchList,
            comments,
            value,
          }) => (
            <div key={id}>
              <StyledListItem>
                <UpvotePanel>
                  <Upvote />
                  {rep}
                </UpvotePanel>
                <StyledIssueContent>
                  <StyledIssueHeader>
                    <OrganizationNameWrapper>
                      {organizationName}

                      {organizationVerified ? (
                        <IconToolTip toolTipText="Verified Contributor">
                          <div>
                            <Verified />
                          </div>
                        </IconToolTip>
                      ) : (
                        ''
                      )}
                    </OrganizationNameWrapper>

                    <IssueLanguage>{language}</IssueLanguage>
                    <SettingsMenu
                      handleDelete={handleDeleteIssue}
                      handleNav={handleNav}
                      deleteRoute={deleteRoute}
                      editRoute="/admin/issues"
                      handleFetchInfo={() => {}}
                      id={id}
                    />
                  </StyledIssueHeader>
                  <StyledIssueText>
                    <NameWrapper>
                      <a href={`./issues/${id}`}>{name}</a>
                    </NameWrapper>
                    <IssueOverview>{body}</IssueOverview>
                  </StyledIssueText>
                  <StyledIssueFooter>
                    <div>
                      {' '}
                      <CommentIcon /> {comments.length} comments
                    </div>
                    <div>{false ? 'Resolved' : `${attempts} attempting`}</div>
                    <div>{watchList.length} Watch</div>
                    <DollarWrapper>${value}</DollarWrapper>
                  </StyledIssueFooter>
                </StyledIssueContent>
              </StyledListItem>
            </div>
          ),
        )}
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
  handleDeleteIssue: T.func,
  handleNav: T.func,
  disabled: T.bool,
  handleInputChange: T.func,
  handleSearchIssues: T.func,
  search: T.object,
};

export default IssueCard;
