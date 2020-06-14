import React, { Fragment } from 'react';
import T from 'prop-types';

import { BackNav, ConditionalRender } from 'components/base_ui';
import { CommentCard, NoComment, NewComment } from 'components/Comments';
import PaymentPortal from 'components/Payments';
import UpvotePanel from 'components/Upvote';

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
  TopBarWrapper,
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
    language,
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
    <div>
      <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" />
      <DetailContainer>
        <IssueDetailWrapper>
          <LeftPanel>
            <UpvotePanel
              dispatchOpenModal={dispatchOpenModal}
              handleUpvote={handleUpvote}
              isIssueDetail
              isSignedIn={isSignedIn}
              issueId={id}
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
                        issueId={id}
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
          <PaymentPortal
            fundedAmount={fundedAmount}
            handleNav={handleNav}
            users={[]}
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
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default IssueDetail;
