import React from 'react';
import T from 'prop-types';
import { BaseContainer, Upvote, BackNav } from 'components/base_ui';
import { CommentCard, NoComment, NewComment } from 'components/Comments';
import IssueDetailHeader from './IssueDetailHeader';

import {
  // DollarWrapper,
  Divider,
  IssueDetailColumn,
  IssueDetailWrapper,
  LeftPanel,
  StyledFlatIconButton,
  UpvotePanel,
  StatusBar,
  StatusItem,
  StatusTitle,
  StyledSecondaryButton,
} from './styledComponents';

const IssueDetail = ({
  activeUser,
  data,
  handleComment,
  handleNav,
  handleUpvote,
  handleAttempt,
}) => {
  const {
    attempting,
    id,
    createdDate,
    body,
    rep,
    comments,
    open,
    user: { username, profilePic },
  } = data;

  const primaryUser = {
    small: true,
    detailRoute: `/admin/users/detail/${username}`,
    alt: username,
    username,
    profilePic,
  };

  console.log(activeUser);

  const generateComments = () =>
    comments.map(comment => {
      const user = {
        small: true,
        detailRoute: `/admin/users/detail/${comment.username}`,
        alt: comment.username,
        username: comment.username,
        profilePic: comment.profilePic,
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
  const commentsDiv = comments.length > 0 ? generateComments() : <NoComment />;

  return (
    <BaseContainer>
      <BackNav
        label="Back to Issues"
        handleNav={handleNav}
        path="/admin/issues"
      />
      <IssueDetailWrapper>
        <LeftPanel>
          <UpvotePanel>
            <StyledFlatIconButton
              Icon={<Upvote />}
              onClick={() => handleUpvote({ itemId: id })}
            />
            {rep}
          </UpvotePanel>
        </LeftPanel>
        <IssueDetailColumn>
          <IssueDetailHeader data={data} />

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

          <StatusBar>
            <StatusItem>
              <StatusTitle>{attempting.length} Attempting</StatusTitle>
              <StyledSecondaryButton
                disabled={!open}
                label="attempt"
                onClick={() => handleAttempt({ activeUser, id })}
              />
            </StatusItem>
            <StatusItem>
              <StatusTitle>0 Pull Requests</StatusTitle>
              <StyledSecondaryButton disabled={!open} label="Submit PR" />
            </StatusItem>
            <StatusItem>
              <StatusTitle>Funded</StatusTitle>
              <StyledSecondaryButton disabled={!open} label="$ Fund Issue" />
            </StatusItem>
          </StatusBar>

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
    </BaseContainer>
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
  handleAttempt: T.func,
};

export default IssueDetail;