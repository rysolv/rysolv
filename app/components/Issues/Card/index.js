import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import {
  CommentIcon,
  ConditionalRender,
  FundingWrapper,
  FundIssueButton,
  IconToolTip,
  LanguageWrapper,
  MonocleIcon,
  Verified,
  WatchButton,
} from 'components/base_ui';
import UpvotePanel from 'components/Upvote';
import { navHelper } from 'utils/globalHelpers';
import IconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueFooterIconWrapper,
  IssueLanguageContainer,
  MobileIconDescription,
  Name,
  NameWrapper,
  OrganizationNameWrapper,
  StyledIconButton,
  StyledIssueCard,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
} from './styledComponents';

const AttemptingIcon = IconDictionary('attempt');

const IssueCard = ({
  activeUser,
  addWatching,
  data,
  deviceView,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => (
  <StyledIssueCard>
    {data.map(
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
        const { id: userId, watching: userWatchList } = activeUser;

        const isMobile =
          deviceView === 'laptopS' ||
          deviceView === 'tablet' ||
          deviceView === 'mobile' ||
          deviceView === 'mobileS' ||
          deviceView === 'mobileXS' ||
          deviceView === 'mobileXXS';

        const userWatching =
          userWatchList && userWatchList.find(el => el.id === id);
        const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);

        const DesktopButtonBar = (
          <Fragment>
            {open ? (
              <IssueCardItem
                onClick={e => navHelper(e, handleNav, `/issues/detail/${id}`)}
              >
                <IssueCardIconWrapper>
                  <CommentIcon />
                </IssueCardIconWrapper>
                <IssueCardLabelWrapper>
                  {comments.length} Comments
                </IssueCardLabelWrapper>
              </IssueCardItem>
            ) : null}

            {open ? (
              <IssueCardItem
                onClick={() =>
                  dispatchFetchWatchList({
                    idArray: attempting,
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
                  label={userWatching ? 'Watching' : 'Watch'}
                  value={watching.length}
                  watching={watching}
                />
              </IssueCardItem>
            ) : null}
          </Fragment>
        );

        const MobileButtonBar = (
          <Fragment>
            {open ? (
              <StyledIconButton
                label="Comments"
                onClick={e => navHelper(e, handleNav, `/issues/detail/${id}`)}
                icon={
                  <Fragment>
                    <CommentIcon />{' '}
                    <MobileIconDescription>
                      {comments.length}
                    </MobileIconDescription>
                  </Fragment>
                }
              />
            ) : null}

            {open ? (
              <StyledIconButton
                label="Attempting"
                onClick={() =>
                  dispatchFetchWatchList({
                    idArray: attempting,
                    modalState: 'issueAttemptList',
                  })
                }
                icon={
                  <Fragment>
                    {AttemptingIcon}{' '}
                    <MobileIconDescription>
                      {attempting.length}
                    </MobileIconDescription>
                  </Fragment>
                }
              />
            ) : null}

            {open ? (
              <StyledIconButton
                label={userWatching ? 'Watching' : 'Watch'}
                onClick={() => {
                  if (!isSignedIn) {
                    return dispatchOpenModal({ modalState: 'signIn' });
                  }
                  return addWatching({ issueId: id, userId });
                }}
                icon={<MonocleIcon />}
                isWatching={userWatching}
                shouldBold
              />
            ) : null}
          </Fragment>
        );

        return (
          <Fragment key={id}>
            <StyledListItem>
              <UpvotePanel
                dispatchOpenModal={dispatchOpenModal}
                handleUpvote={handleUpvote}
                isSignedIn={isSignedIn}
                issueId={id}
                rep={rep}
                upvoted={upvoted}
                userId={activeUser.id}
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
                  <NameWrapper>
                    <Name
                      href={`/issues/detail/${id}`}
                      onClick={e =>
                        navHelper(e, handleNav, `/issues/detail/${id}`)
                      }
                    >
                      {name}
                    </Name>
                  </NameWrapper>
                  <IssueLanguageContainer>
                    {language.map(el => (
                      <LanguageWrapper key={`${id}-${el}`} language={el} />
                    ))}
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
                        issueId={id}
                        open={open}
                      />
                    }
                    FallbackComponent={
                      <FundingWrapper open={open} value="Issue Closed" medium />
                    }
                    shouldRender={open}
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
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default IssueCard;
