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
  activeUser: { balance, id: activeUserId, issues },
  alerts: { error, success },
  data,
  data: {
    body,
    comments,
    createdDate,
    fundedAmount,
    id: issueId,
    language,
    name,
    open,
    profilePic,
    rep,
    userId,
    username,
  },
  deviceView,
  dispatchCloseIssue,
  dispatchEditIssue,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleClearAlerts,
  handleComment,
  handleIncrement,
  handleNav,
  handleSubmitAccountPayment,
  handleUpvote,
  isSignedIn,
  paymentAlerts,
}) => {
  const [displayEditView, setDisplayEditView] = useState(false);
  const [bodyChange, setBodyChange] = useState(body);
  const [languageChange, setLanguageChange] = useState(language);
  const [nameChange, setNameChange] = useState(name);
  const handleClose = () => {
    setDisplayEditView(false);
    setBodyChange(body);
    setLanguageChange(language);
    setNameChange(name);
  };

  const handleSave = () => {
    dispatchEditIssue({
      editRequest: {
        body: bodyChange,
        name: nameChange,
        language: languageChange,
      },
      issueId,
    });
  };

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
              userId: activeUserId,
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
              userId={activeUserId}
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
                isDesktop={isDesktop}
                isSignedIn={isSignedIn}
              />
            </TopBarWrapper>
            <IssueDetailColumn>
              <IssueDetailHeader
                data={data}
                displayEditView={displayEditView}
                handleNav={handleNav}
                isSignedIn={isSignedIn}
                nameChange={nameChange}
                setNameChange={setNameChange}
              />

              <div style={{ minHeight: '30rem' }}>
                <IssueDetailBody
                  body={body}
                  bodyChange={bodyChange}
                  date={createdDate}
                  displayEditView={displayEditView}
                  handleNav={handleNav}
                  language={language}
                  languageChange={languageChange}
                  setBodyChange={setBodyChange}
                  setLanguageChange={setLanguageChange}
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
                handleClose={handleClose}
                handleSave={handleSave}
                setDisplayEditView={setDisplayEditView}
                type="issue"
              />
            }
            shouldRender={
              isSignedIn && !!issues.find(({ id }) => issueId === id)
            }
          />
          <PaymentPortal
            balance={balance}
            fundedAmount={fundedAmount}
            handleClearAlerts={handleClearAlerts}
            handleNav={handleNav}
            handleSubmitAccountPayment={handleSubmitAccountPayment}
            isSignedIn={isSignedIn}
            issueId={issueId}
            paymentAlerts={paymentAlerts}
            userId={activeUserId}
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
  dispatchEditIssue: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  paymentAlerts: T.object,
};

export default IssueDetail;
