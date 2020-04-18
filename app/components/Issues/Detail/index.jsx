import React from 'react';
import T from 'prop-types';

import { BaseContainer, Upvote, BackNav } from 'components/base_ui';
import { CommentCard, NoComment } from 'components/Comments';
import IssueDetailHeader from './IssueDetailHeader';

import {
  // DollarWrapper,
  Divider,
  IssueDetailColumn,
  IssueDetailWrapper,
  LeftPanel,
  StyledFlatIconButton,
  UpvotePanel,
} from './styledComponents';

const IssueDetail = ({ data, handleUpvote, handleNav }) => {
  const {
    // attempts,
    id,
    createdDate,
    body,
    rep,
    comments,
    user: { username, profilePic },
  } = data;

  const primaryUser = {
    small: true,
    detailRoute: `/admin/users/detail/${username}`,
    alt: username,
    username,
    profilePic,
  };

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
          userProfile={user}
        />
      );
    });
  const commentsDiv = comments.length > 0 ? generateComments() : <NoComment />;

  // console.log(comments);
  return (
    <BaseContainer>
      <BackNav
        label="Back to browse"
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

          <CommentCard
            primary
            body={body}
            date={createdDate}
            userProfile={primaryUser}
            handleNav={handleNav}
          />

          <Divider>Comments</Divider>
          {commentsDiv}
        </IssueDetailColumn>
      </IssueDetailWrapper>
    </BaseContainer>
  );
};

IssueDetail.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  handleUpvote: T.func,
  data: T.object,
  handleNav: T.func,
};

export default IssueDetail;
