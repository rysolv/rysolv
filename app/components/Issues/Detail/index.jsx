import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BackNav, ConditionalRender } from 'components/base_ui';
import { CommentCard, NoComment, NewComment } from 'components/Comments';
import PaymentPortal from 'components/Payments';
import UpvotePanel from 'components/Upvote';
import iconDictionary from 'utils/iconDictionary';

import IssueDetailBody from './IssueDetailBody';
import IssueDetailHeader from './IssueDetailHeader';
import IssueTopBar from './IssueTopBar';
import {
  CommentWrapper,
  DetailContainer,
  Divider,
  IssueDetailColumn,
  IssueDetailWrapper,
  LeftPanel,
  SidebarContainer,
  StyledButton,
  StyledErrorSuccessBanner,
  StyledIssueAccountManager,
  TopBarWrapper,
} from './styledComponents';

const CloseCircleIcon = iconDictionary('closeCircle');
const OpenCircleIcon = iconDictionary('successOutline');

const IssueDetail = ({
  activeUser,
  activeUser: { issues },
  alerts: { error, success },
  data,
  data: {
    body,
    comments,
    createdDate,
    fundedAmount,
    id: issueId,
    language,
    open,
    profilePic,
    rep,
    userId,
    username,
  },
  deviceView,
  dispatchCloseIssue,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleClearAlerts,
  handleComment,
  handleIncrement,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => {
  const [displayEditView, setDisplayEditView] = useState(false);

  const CloseOpenIssueComponent = (
    <ConditionalRender
      Component={
        <StyledButton
          disableRipple
          onClick={() =>
            dispatchOpenModal({
              modalState: 'closeIssue',
              tableData: { issueId },
            })
          }
          open={open}
        >
          {CloseCircleIcon}
          Close Issue
        </StyledButton>
      }
      FallbackComponent={
        <StyledButton
          disableRipple
          onClick={() =>
            dispatchCloseIssue({
              issueId,
              shouldClose: false,
              userId: activeUser.id,
            })
          }
          open={open}
        >
          {OpenCircleIcon}
          Reopen Issue
        </StyledButton>
      }
      shouldRender={open}
    />
  );

  const primaryUser = {
    alt: username,
    detailRoute: `/users/detail/${userId}`,
    profilePic,
    small: true,
    username,
  };

  const generateComments = () =>
    comments.map(comment => {
      const user = {
        alt: comment.username,
        detailRoute: `/users/detail/${comment.userId}`,
        profilePic: comment.profilePic,
        size: '4rem',
        username: comment.username,
      };
      return (
        <CommentCard
          key={`${comment.username}-${comment.createdDate}`}
          body={comment.body}
          date={comment.createdDate}
          handleNav={handleNav}
          userProfile={user}
        />
      );
    });

  const commentsDiv =
    comments && comments.length > 0 ? generateComments() : <NoComment />;

  const isDesktop = deviceView === 'desktop';

  const upvoted = activeUser.upvotes && activeUser.upvotes.includes(issueId);
  return (
    <div>
      <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" />
      <ConditionalRender
        Component={
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAlerts}
            success={success}
          />
        }
        shouldRender={isSignedIn && !!issues.find(({ id }) => issueId === id)}
      />
      <DetailContainer>
        <IssueDetailWrapper>
          <LeftPanel>
            <UpvotePanel
              dispatchOpenModal={dispatchOpenModal}
              handleUpvote={handleUpvote}
              isIssueDetail
              isSignedIn={isSignedIn}
              issueId={issueId}
              rep={rep}
              upvoted={upvoted}
              userId={activeUser.id}
            />
          </LeftPanel>
          <div>
            <TopBarWrapper>
              <IssueTopBar
                activeUser={activeUser}
                data={data}
                dispatchFetchWatchList={dispatchFetchWatchList}
                dispatchOpenModal={dispatchOpenModal}
                handleIncrement={handleIncrement}
                handleNav={handleNav}
                isDesktop={isDesktop}
                isSignedIn={isSignedIn}
              />
            </TopBarWrapper>
            <IssueDetailColumn>
              <IssueDetailHeader
                activeUser={activeUser}
                data={data}
                dispatchFetchWatchList={dispatchFetchWatchList}
                dispatchOpenModal={dispatchOpenModal}
                handleIncrement={handleIncrement}
                handleNav={handleNav}
                isSignedIn={isSignedIn}
              />

              <div style={{ minHeight: '30rem' }}>
                <IssueDetailBody
                  body={body}
                  date={createdDate}
                  handleNav={handleNav}
                  language={language}
                  userProfile={primaryUser}
                />
              </div>

              <Divider>Comments</Divider>
              <CommentWrapper>{commentsDiv}</CommentWrapper>

              <ConditionalRender
                Component={
                  <Fragment>
                    <Divider>Leave a Comment</Divider>
                    <CommentWrapper>
                      <NewComment
                        activeUser={activeUser}
                        handleComment={handleComment}
                        handleNav={handleNav}
                        issueId={issueId}
                      />
                    </CommentWrapper>
                  </Fragment>
                }
                shouldRender={isSignedIn}
              />
            </IssueDetailColumn>
          </div>
        </IssueDetailWrapper>
        <SidebarContainer>
          <ConditionalRender
            Component={
              <StyledIssueAccountManager
                displayEditView={displayEditView}
                setDisplayEditView={setDisplayEditView}
                type="issue"
              />
            }
            shouldRender={
              isSignedIn && !!issues.find(({ id }) => issueId === id)
            }
          />
          <PaymentPortal
            fundedAmount={fundedAmount}
            handleNav={handleNav}
            users={[]}
          />
          <ConditionalRender
            Component={CloseOpenIssueComponent}
            shouldRender={
              isSignedIn && !!issues.find(({ id }) => issueId === id)
            }
          />
        </SidebarContainer>
      </DetailContainer>
    </div>
  );
};

IssueDetail.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  data: T.object,
  deviceView: T.string,
  dispatchCloseIssue: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default IssueDetail;
