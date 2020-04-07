import React from 'react';
import T from 'prop-types';

import { IconToolTip, Upvote, CommentIcon, Verified } from 'components/base_ui';
import SettingsMenu from 'components/SettingsMenu';

import {
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

const IssueCard = ({ data, handleDeleteIssue, handleNav }) => {
  const deleteRoute = `/admin/issues`;
  // const editRoute = `/admin/issues/edit`;

  return (
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
  );
};

IssueCard.propTypes = {
  data: T.array.isRequired,
  handleDeleteIssue: T.func.isRequired,
  // handleFetchInfo: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default IssueCard;
