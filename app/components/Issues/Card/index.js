import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import {
  CommentIcon,
  FundingWrapper,
  IconToolTip,
  LanguageWrapper,
  Verified,
  WatchButton,
} from 'components/base_ui';
import UpvotePanel from 'components/Upvote';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
import IconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueLanguageContainer,
  NameWrapper,
  OrganizationNameWrapper,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
} from './styledComponents';

const AttemptingIcon = IconDictionary('attempt');

const IssueCard = ({
  activeUser,
  data,
  dispatchOpenModal,
  handleIncrement,
  handleNav,
  handleUpvote,
}) =>
  data.map(
    ({
      attempting,
      comments,
      createdDate,
      fundedAmount,
      id,
      language,
      name,
      open,
      organizationId,
      organizationName,
      organizationVerified,
      rep,
      watching,
    }) => {
      const userWatching =
        activeUser.watching && activeUser.watching.includes(id);
      const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);
      return (
        <Fragment key={id}>
          <StyledListItem>
            <UpvotePanel
              upvoted={upvoted}
              handleUpvote={handleUpvote}
              issueId={id}
              userId={activeUser.id}
              rep={rep}
            />
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
                {moment.utc(createdDate).fromNow()}
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
                      dispatchOpenModal={dispatchOpenModal}
                      handleWatch={() =>
                        handleIncrement({
                          userId: activeUser.id,
                          id,
                          column: 'watching',
                          remove: userWatching,
                        })
                      }
                      label={userWatching ? 'Watching' : 'Watch'}
                      value={watching.length}
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
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
};

export default IssueCard;
