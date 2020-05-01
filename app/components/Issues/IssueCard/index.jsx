import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CommentIcon,
  FundingWrapper,
  IconToolTip,
  Upvote,
  Verified,
  LanguageWrapper,
  WatchButton,
} from 'components/base_ui';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
import SettingsMenu from 'components/SettingsMenu';
import IconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueLanguageContainer,
  NameWrapper,
  OrganizationNameWrapper,
  StyledFlatIconButton,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
  UpvotePanel,
} from './styledComponents';

const AttemptingIcon = IconDictionary('attempt');

const IssueCard = ({
  activeUser,
  data,
  handleDeleteIssue,
  handleIncrement,
  handleNav,
  handleUpvote,
}) => {
  const deleteRoute = `/admin/issues`;
  const editRoute = `/admin/issues/edit`;

  return data.map(
    ({
      id,
      name,
      organizationName,
      organizationId,
      organizationVerified,
      language,
      open,
      attempting,
      rep,
      watching,
      comments,
      value,
    }) => {
      const userWatching =
        activeUser.watching && activeUser.watching.includes(id);
      return (
        <Fragment key={id}>
          <StyledListItem>
            <UpvotePanel>
              <StyledFlatIconButton
                Icon={<Upvote />}
                onClick={() =>
                  handleUpvote({ issueId: id, userId: activeUser.id })
                }
              />
              {rep}
            </UpvotePanel>
            <StyledIssueContent>
              <StyledIssueHeader>
                <OrganizationNameWrapper
                  href={`/admin/organizations/detail/${organizationId}`}
                  onClick={e =>
                    navHelper(
                      e,
                      handleNav,
                      `/admin/organizations/detail/${organizationId}`,
                    )
                  }
                >
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
                <SettingsMenu
                  handleDelete={handleDeleteIssue}
                  handleNav={handleNav}
                  deleteRoute={deleteRoute}
                  editRoute={editRoute}
                  handleFetchInfo={() => {}}
                  id={id}
                />
              </StyledIssueHeader>
              <StyledIssueText>
                <NameWrapper
                  href={`/admin/issues/detail/${id}`}
                  onClick={e =>
                    navHelper(e, handleNav, `/admin/issues/detail/${id}`)
                  }
                >
                  {name}
                </NameWrapper>
                <IssueLanguageContainer>
                  {language.map(el => (
                    <LanguageWrapper key={`${id}-${el}`} language={el} />
                  ))}
                </IssueLanguageContainer>
              </StyledIssueText>

              <StyledIssueFooter open={open}>
                {open ? (
                  <IssueCardItem>
                    <IssueCardIconWrapper>
                      <CommentIcon />
                    </IssueCardIconWrapper>
                    <IssueCardLabelWrapper>
                      {comments.length} comments
                    </IssueCardLabelWrapper>
                  </IssueCardItem>
                ) : null}

                {open ? (
                  <IssueCardItem>
                    <IssueCardIconWrapper>
                      {AttemptingIcon}
                    </IssueCardIconWrapper>
                    <IssueCardLabelWrapper>
                      {attempting.length} attempting
                    </IssueCardLabelWrapper>
                  </IssueCardItem>
                ) : null}

                {open ? (
                  <IssueCardItem>
                    <WatchButton
                      label={userWatching ? 'Watching' : 'Watch'}
                      value={watching.length}
                      handleWatch={() =>
                        handleIncrement({
                          userId: activeUser.id,
                          id,
                          column: 'watching',
                          remove: userWatching,
                        })
                      }
                    />
                  </IssueCardItem>
                ) : null}

                <FundingWrapper
                  open={open}
                  value={open ? formatDollarAmount(value) : 'Issue Closed'}
                  medium
                />
              </StyledIssueFooter>
            </StyledIssueContent>
          </StyledListItem>
        </Fragment>
      );
    },
  );
};

IssueCard.propTypes = {
  // handleFetchInfo: T.func.isRequired,
  data: T.array.isRequired,
  handleDeleteIssue: T.func.isRequired,
  handleIncrement: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
};

export default IssueCard;
