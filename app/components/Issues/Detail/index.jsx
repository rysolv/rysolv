import React, { Fragment } from 'react';
import T from 'prop-types';
// import { BackNav } from 'components/base_ui';
import { CommentCard, NoComment, NewComment } from 'components/Comments';
import UpvotePanel from 'components/Upvote';
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
  handleComment,
  handleNav,
  handleUpvote,
  handleIncrement,
}) => {
  const {
    id,
    createdDate,
    body,
    rep,
    comments,
    open,
    userId,
    username,
    profilePic,
  } = data;

  const primaryUser = {
    small: true,
    detailRoute: `/users/detail/${userId}`,
    alt: username,
    username,
    profilePic,
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
  const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);

  return (
    <Fragment>
      {/* <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" /> */}

      <DetailContainer>
        <IssueDetailWrapper>
          <LeftPanel>
            <UpvotePanel
              upvoted={upvoted}
              handleUpvote={handleUpvote}
              issueId={id}
              userId={activeUser.id}
              rep={rep}
            />
          </LeftPanel>
          <IssueDetailColumn>
            <IssueDetailHeader
              activeUser={activeUser}
              data={data}
              handleIncrement={handleIncrement}
              handleNav={handleNav}
            />

            <div style={{ minHeight: '30rem' }}>
              <CommentCard
                primary
                body={body}
                date={createdDate}
                userProfile={primaryUser}
                handleNav={handleNav}
              />
            </div>

            <Divider>Status: {open ? 'Open' : 'Issue Closed'}</Divider>

            <IssueStatusBar
              activeUser={activeUser}
              data={data}
              handleIncrement={handleIncrement}
            />

            <Divider>Comments</Divider>
            {commentsDiv}

            <Divider>Leave a Comment</Divider>
            <NewComment
              issueId={id}
              activeUser={activeUser}
              handleComment={handleComment}
              handleNav={handleNav}
            />
          </IssueDetailColumn>
        </IssueDetailWrapper>
        <SidebarContainer>
          <IssueSidebar data={data} activeUser={activeUser} />
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
  handleComment: T.func,
  handleUpvote: T.func,
  data: T.object,
  handleNav: T.func,
  handleIncrement: T.func,
};

export default IssueDetail;
