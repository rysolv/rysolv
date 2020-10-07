import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BackNav, ConditionalRender } from 'components/base_ui';
import { CommentCard, NewComment, NoComment } from 'components/MarkdownRender';
import UpvotePanel from 'components/Upvote';
import PaymentPortal from 'containers/Payments';
import iconDictionary from 'utils/iconDictionary';

import IssueDetailBody from './IssueDetailBody';
import IssueDetailHeader from './IssueDetailHeader';
import IssueTopBar from './IssueTopBar';
import {
  CommentWrapper,
  DetailContainer,
  Divider,
  EditIssueWrapper,
  IssueDetailColumn,
  IssueDetailContainer,
  IssueDetailContentContainer,
  IssueDetailWrapper,
  LeftPanel,
  ManageIssueWrapper,
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
  activeUser: { id: activeUserId, issues },
  addWatching,
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
    rep,
    repo,
    userId,
    username,
  },
  deviceView,
  dispatchCloseIssue,
  dispatchEditIssue,
  dispatchFetchAttemptList,
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleClearAlerts,
  handleComment,
  handleIncrement,
  handleNav,
  handleUpvote,
  isSignedIn,
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

  const EditIssueComponent = (
    <StyledIssueAccountManager
      displayEditView={displayEditView}
      handleClose={handleClose}
      handleSave={handleSave}
      setDisplayEditView={setDisplayEditView}
      type="issue"
    />
  );

  const primaryUser = {
    route: `/users/detail/${userId}`,
    username,
  };

  const generateComments = () =>
    comments.map(comment => {
      const user = {
        alt: comment.username,
        image: comment.profilePic,
        route: `/users/detail/${comment.userId}`,
        username: comment.username,
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

  const commentsDiv =
    comments && comments.length > 0 ? generateComments() : <NoComment />;

  const isDesktop =
    deviceView === 'desktopS' ||
    deviceView === 'desktop' ||
    deviceView === 'desktopL';

  const isMobileOrLaptop =
    deviceView === 'mobileXXS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobile' ||
    deviceView === 'tablet' ||
    deviceView === 'laptopS' ||
    deviceView === 'laptop';

  const upvoted = activeUser.upvotes && activeUser.upvotes.includes(issueId);

  const ManageIssueComponent = () => (
    <Fragment>
      <Divider>Manage Issue</Divider>
      <ManageIssueWrapper>
        <EditIssueWrapper>{EditIssueComponent}</EditIssueWrapper>
        {CloseOpenIssueComponent}
      </ManageIssueWrapper>
    </Fragment>
  );
  return (
    <IssueDetailContainer>
      <BackNav label="Back to Issues" path="/issues" />
      <ConditionalRender
        Component={
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAlerts}
            success={success}
          />
        }
        shouldRender={isSignedIn}
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
          <IssueDetailContentContainer>
            <TopBarWrapper>
              <IssueTopBar
                activeUser={activeUser}
                addWatching={addWatching}
                data={data}
                dispatchFetchAttemptList={dispatchFetchAttemptList}
                dispatchFetchPullRequestList={dispatchFetchPullRequestList}
                dispatchFetchWatchList={dispatchFetchWatchList}
                dispatchOpenIssueModal={dispatchOpenIssueModal}
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
                nameChange={nameChange}
                setNameChange={setNameChange}
              />

              <div style={{ minHeight: '30rem' }}>
                <IssueDetailBody
                  body={body}
                  bodyChange={bodyChange}
                  date={createdDate}
                  displayEditView={displayEditView}
                  language={language}
                  languageChange={languageChange}
                  repo={repo}
                  setBodyChange={setBodyChange}
                  setLanguageChange={setLanguageChange}
                  userProfile={primaryUser}
                />
              </div>

              <ConditionalRender
                Component={ManageIssueComponent}
                shouldRender={
                  isMobileOrLaptop &&
                  isSignedIn &&
                  issues &&
                  !!issues.find(({ id }) => issueId === id)
                }
              />

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
                        issueId={issueId}
                      />
                    </CommentWrapper>
                  </Fragment>
                }
                shouldRender={isSignedIn}
              />
            </IssueDetailColumn>
          </IssueDetailContentContainer>
        </IssueDetailWrapper>
        <SidebarContainer>
          <ConditionalRender
            Component={EditIssueComponent}
            shouldRender={
              isSignedIn && issues && !!issues.find(({ id }) => issueId === id)
            }
          />
          <PaymentPortal
            fundedAmount={fundedAmount}
            handleNav={handleNav}
            isSignedIn={isSignedIn}
            issueId={issueId}
            open={open}
          />
          <ConditionalRender
            Component={CloseOpenIssueComponent}
            shouldRender={
              isSignedIn && issues && !!issues.find(({ id }) => issueId === id)
            }
          />
        </SidebarContainer>
      </DetailContainer>
    </IssueDetailContainer>
  );
};

IssueDetail.propTypes = {
  activeUser: T.object,
  addWatching: T.func,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  data: T.object,
  deviceView: T.string,
  dispatchCloseIssue: T.func,
  dispatchEditIssue: T.func,
  dispatchFetchAttemptList: T.func,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default IssueDetail;
