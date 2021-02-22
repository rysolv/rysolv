import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import UpvotePanel from 'components/Upvote';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  IssueAttempts,
  IssueContent,
  IssueContentInfo,
  IssueDetail,
  IssueFundedAmount,
  IssueListItem,
  IssueModifiedDate,
  IssueName,
  IssueNameWrapper,
  IssueOpen,
  IssueOpenWrapper,
  IssuesList,
} from '../styledComponents';

const RepoIssuesTab = ({
  activeUser,
  dispatchOpenModal,
  handleNav,
  handleUpvote,
  isSignedIn,
  issues,
}) => (
  <IssuesList>
    {issues.map(
      ({
        attempting,
        fundedAmount,
        id,
        modifiedDate,
        name,
        open,
        rep,
        userId,
      }) => {
        const upvoted = activeUser.upvotes && activeUser.upvotes.includes(id);
        return (
          <IssueListItem key={`list-item-${id}`}>
            <IssueContent>
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
              <IssueContentInfo>
                <IssueModifiedDate>
                  {moment.utc(modifiedDate).fromNow()}
                </IssueModifiedDate>
                <IssueDetail>
                  <IssueNameWrapper>
                    <IssueName
                      onClick={() => handleNav(`/issues/detail/${id}`)}
                    >
                      {name}
                    </IssueName>
                    <IssueOpenWrapper>
                      <IssueOpen open={open}>
                        {open ? 'Open' : 'Closed'}
                      </IssueOpen>
                      <IssueAttempts>
                        {attempting.length} Attempts
                      </IssueAttempts>
                    </IssueOpenWrapper>
                  </IssueNameWrapper>
                  <IssueFundedAmount>
                    {formatDollarAmount(fundedAmount)}
                  </IssueFundedAmount>
                </IssueDetail>
              </IssueContentInfo>
            </IssueContent>
          </IssueListItem>
        );
      },
    )}
  </IssuesList>
);

RepoIssuesTab.propTypes = {
  activeUser: T.object,
  dispatchOpenModal: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issues: T.array,
};

export default RepoIssuesTab;
