import React, { Fragment } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  CommentIcon,
  ConditionalRender,
  FundingWrapper,
  FundIssueButton,
  IconToolTip,
  LanguageWrapper,
  MonocleIcon,
  WatchButton,
} from 'components/base_ui';
import UpvotePanel from 'components/Upvote';
import { navHelper } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueFooterIconWrapper,
  IssueLanguageContainer,
  MobileIconDescription,
  NameLink,
  NameWrapper,
  RepoNameWrapper,
  StyledIconButton,
  StyledIssueCard,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
  StyledVerified,
} from './styledComponents';
import { issueTags, tagColors } from '../constants';
import { TagWrapper } from '../styledComponents';

const AttemptingIcon = iconDictionary('attempt');

const IssueCard = ({
  activeUser: { id: userId, upvotes: userUpvotes, watching: userWatchList },
  addWatching,
  data,
  deviceView,
  dispatchFetchAttemptList,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleNav,
  handleUpvote,
  height,
  isSignedIn,
}) => (
  <StyledIssueCard height={height}>
    {data.map(
      ({
        attempting,
        comments,
        createdDate,
        fundedAmount,
        id,
        isInFundingQueue,
        isPullRequestMerged,
        isUserAccepted,
        language,
        name,
        open,
        rep,
        repoId,
        repoName,
        repoVerified,
        type,
        watching,
      }) => {
        const colorIndex = issueTags.indexOf(type);

        const isMobile =
          deviceView === 'laptopS' ||
          deviceView === 'tablet' ||
          deviceView === 'mobile' ||
          deviceView === 'mobileS' ||
          deviceView === 'mobileXS' ||
          deviceView === 'mobileXXS';

        const userWatching =
          userWatchList && userWatchList.find(el => el.id === id);
        const upvoted = userUpvotes && userUpvotes.includes(id);

        const DesktopButtonBar = (
          <Fragment>
            {open ? (
              <IssueCardItem>
                <IssueCardIconWrapper>
                  <CommentIcon />
                </IssueCardIconWrapper>
                <IssueCardLabelWrapper>
                  <Link to={`/issues/detail/${id}`}>{comments} Comments</Link>
                </IssueCardLabelWrapper>
              </IssueCardItem>
            ) : null}

            {open ? (
              <IssueCardItem
                onClick={() =>
                  dispatchFetchAttemptList({
                    issueId: id,
                    modalState: 'issueAttemptList',
                  })
                }
              >
                <IssueCardIconWrapper>{AttemptingIcon}</IssueCardIconWrapper>
                <IssueCardLabelWrapper>
                  {attempting.length} Attempting
                </IssueCardLabelWrapper>
              </IssueCardItem>
            ) : null}

            {open ? (
              <IssueCardItem>
                <WatchButton
                  dispatchFetchWatchList={dispatchFetchWatchList}
                  dispatchOpenModal={dispatchOpenModal}
                  handleWatch={() => addWatching({ issueId: id, userId })}
                  isSignedIn={isSignedIn}
                  issueId={id}
                  label={userWatching ? 'Watching' : 'Watch'}
                  value={watching.length}
                />
              </IssueCardItem>
            ) : null}
          </Fragment>
        );

        const MobileButtonBar = (
          <Fragment>
            {open ? (
              <StyledIconButton
                icon={
                  <Fragment>
                    <CommentIcon />{' '}
                    <MobileIconDescription>{comments}</MobileIconDescription>
                  </Fragment>
                }
                label="Comments"
                onClick={e => navHelper(e, handleNav, `/issues/detail/${id}`)}
              />
            ) : null}

            {open ? (
              <StyledIconButton
                icon={
                  <Fragment>
                    {AttemptingIcon}{' '}
                    <MobileIconDescription>
                      {attempting.length}
                    </MobileIconDescription>
                  </Fragment>
                }
                label="Attempting"
                onClick={() =>
                  dispatchFetchAttemptList({
                    issueId: id,
                    modalState: 'issueAttemptList',
                  })
                }
              />
            ) : null}

            {open ? (
              <StyledIconButton
                icon={<MonocleIcon />}
                isWatching={userWatching}
                label={userWatching ? 'Watching' : 'Watch'}
                onClick={() => {
                  if (!isSignedIn) {
                    return dispatchOpenModal({ modalState: 'signIn' });
                  }
                  return addWatching({ issueId: id, userId });
                }}
                shouldBold
              />
            ) : null}
          </Fragment>
        );

        return (
          <Fragment key={id}>
            <StyledListItem>
              <UpvotePanel
                disabled={!open}
                dispatchOpenModal={dispatchOpenModal}
                handleUpvote={handleUpvote}
                isSignedIn={isSignedIn}
                issueId={id}
                rep={rep}
                upvoted={upvoted}
                userId={userId}
              />
              <StyledIssueContent>
                <StyledIssueHeader>
                  <RepoNameWrapper>
                    <Link to={`/repos/detail/${repoId}`}>{repoName}</Link>

                    {repoVerified ? (
                      <IconToolTip toolTipText="Verified Contributor">
                        <StyledVerified />
                      </IconToolTip>
                    ) : (
                      ''
                    )}
                  </RepoNameWrapper>
                  {moment.utc(createdDate).fromNow()}
                </StyledIssueHeader>
                <StyledIssueText>
                  <NameWrapper>
                    <NameLink to={`/issues/detail/${id}`}>{name}</NameLink>
                  </NameWrapper>
                  <IssueLanguageContainer>
                    {language.map(el => (
                      <LanguageWrapper key={`${id}-${el}`} language={el} />
                    ))}
                    <TagWrapper tagColor={tagColors[colorIndex]}>
                      {type}
                    </TagWrapper>
                  </IssueLanguageContainer>
                </StyledIssueText>

                <StyledIssueFooter open={open}>
                  <IssueFooterIconWrapper>
                    <ConditionalRender
                      Component={DesktopButtonBar}
                      FallbackComponent={MobileButtonBar}
                      shouldRender={!isMobile}
                    />
                  </IssueFooterIconWrapper>

                  <ConditionalRender
                    Component={
                      <FundIssueButton
                        dispatchOpenModal={dispatchOpenModal}
                        fundedAmount={fundedAmount}
                        isInFundingQueue={isInFundingQueue}
                        isPullRequestMerged={isPullRequestMerged}
                        issueId={id}
                        isUserAccepted={isUserAccepted}
                        open={open}
                        rep={rep}
                      />
                    }
                    FallbackComponent={
                      <FundingWrapper open={open} value="Issue Closed" medium />
                    }
                    shouldRender={
                      open ||
                      (!isInFundingQueue &&
                        isPullRequestMerged &&
                        !isUserAccepted &&
                        !open)
                    }
                  />
                </StyledIssueFooter>
              </StyledIssueContent>
            </StyledListItem>
          </Fragment>
        );
      },
    )}
  </StyledIssueCard>
);

IssueCard.propTypes = {
  activeUser: T.object.isRequired,
  addWatching: T.func.isRequired,
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchFetchAttemptList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  height: T.number.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default IssueCard;
