import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CommentIcon,
  FundingWrapper,
  IconToolTip,
  LanguageWrapper,
  Upvote,
  Verified,
  WatchButton,
} from 'components/base_ui';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
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
  handleIncrement,
  handleNav,
  handleUpvote,
}) =>
  data.map(
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
      fundedAmount,
    }) => {
      const userWatching =
        activeUser.watching && activeUser.watching.includes(id);
      const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);
      return (
        <Fragment key={id}>
          <StyledListItem>
            <UpvotePanel upvoted={upvoted}>
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
                  href={`/organizations/detail/${organizationId}`}
                  onClick={e =>
                    navHelper(
                      e,
                      handleNav,
                      `/organizations/detail/${organizationId}`,
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
              </StyledIssueHeader>
              <StyledIssueText>
                <NameWrapper
                  href={`/issues/detail/${id}`}
                  onClick={e => navHelper(e, handleNav, `/issues/detail/${id}`)}
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
                      {comments.length} Comments
                    </IssueCardLabelWrapper>
                  </IssueCardItem>
                ) : null}

                {open ? (
                  <IssueCardItem>
                    <IssueCardIconWrapper>
                      {AttemptingIcon}
                    </IssueCardIconWrapper>
                    <IssueCardLabelWrapper>
                      {attempting.length} Attempting
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
                  value={
                    open ? formatDollarAmount(fundedAmount) : 'Issue Closed'
                  }
                  medium
                />
              </StyledIssueFooter>
            </StyledIssueContent>
          </StyledListItem>
        </Fragment>
      );
    },
  );

IssueCard.propTypes = {
  data: T.array.isRequired,
  handleIncrement: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
};

export default IssueCard;
