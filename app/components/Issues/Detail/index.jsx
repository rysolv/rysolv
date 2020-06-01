import React, { Fragment } from 'react';
import T from 'prop-types';
// import { BackNav } from 'components/base_ui';
import { CommentCard, NoComment, NewComment } from 'components/Comments';
import UpvotePanel from 'components/Upvote';
import PaymentPortal from 'components/Payments';
import IssueDetailHeader from './IssueDetailHeader';
import IssueStatusBar from './IssueStatusBar';
import IssueSidebar from './IssueSidebar';

import {
  DetailContainer,
  Divider,
  IssueDetailColumn,
  IssueDetailWrapper,
  LeftPanel,
  SidebarContainer,
} from './styledComponents';

const IssueDetail = ({
  activeUser,
  data,
  deviceView,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleComment,
  handleIncrement,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => {
  const {
    body,
    comments,
    createdDate,
    fundedAmount,
    id,
    open,
    profilePic,
    rep,
    userId,
    username,
  } = data;

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

  const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);
  return (
    <Fragment>
      {/* <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" /> */}
      <DetailContainer>
        <IssueDetailWrapper>
          <LeftPanel>
            <UpvotePanel
              dispatchOpenModal={dispatchOpenModal}
              handleUpvote={handleUpvote}
              isSignedIn={isSignedIn}
              issueId={id}
              rep={rep}
              upvoted={upvoted}
              userId={activeUser.id}
            />
          </LeftPanel>
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
              <CommentCard
                body={body}
                date={createdDate}
                handleNav={handleNav}
                primary
                userProfile={primaryUser}
              />
            </div>

            <Divider>Status: {open ? 'Open' : 'Issue Closed'}</Divider>

            <IssueStatusBar
              activeUser={activeUser}
              data={data}
              dispatchOpenModal={dispatchOpenModal}
              handleIncrement={handleIncrement}
              isDesktop={isDesktop}
              isSignedIn={isSignedIn}
            />

            <Divider>Comments</Divider>
            {commentsDiv}

            <Divider>Leave a Comment</Divider>
            <NewComment
              activeUser={activeUser}
              handleComment={handleComment}
              handleNav={handleNav}
              issueId={id}
            />
          </IssueDetailColumn>
        </IssueDetailWrapper>
        <SidebarContainer>
          <IssueSidebar
            activeUser={activeUser}
            data={data}
            dispatchFetchWatchList={dispatchFetchWatchList}
            dispatchOpenModal={dispatchOpenModal}
            handleIncrement={handleIncrement}
            isSignedIn={isSignedIn}
          />
          <PaymentPortal
            fundedAmount={fundedAmount}
            handleNav={handleNav}
            users={[]}
          />
        </SidebarContainer>
      </DetailContainer>
    </Fragment>
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
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default IssueDetail;
