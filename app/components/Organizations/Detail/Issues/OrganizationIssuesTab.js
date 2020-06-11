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

const OrganizationIssuesTab = ({
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
      }) => (
        <IssueListItem key={`list-item-${id}`}>
          <IssueContent>
            <UpvotePanel
              dispatchOpenModal={dispatchOpenModal}
              handleUpvote={handleUpvote}
              isSignedIn={isSignedIn}
              issueId={id}
              rep={rep}
              upvoted={false}
              userId={userId} // bug
            />
            <IssueContentInfo>
              <IssueModifiedDate>
                {moment.utc(modifiedDate).fromNow()}
              </IssueModifiedDate>
              <IssueDetail>
                <IssueNameWrapper>
                  <IssueName onClick={() => handleNav(`/issues/detail/${id}`)}>
                    {name}
                  </IssueName>
                  <IssueOpenWrapper>
                    <IssueOpen open={open}>
                      {open ? 'Funded' : 'Unfunded'}
                    </IssueOpen>
                    <IssueAttempts>{attempting.length} Attempts</IssueAttempts>
                  </IssueOpenWrapper>
                </IssueNameWrapper>
                <IssueFundedAmount>
                  {formatDollarAmount(fundedAmount)}
                </IssueFundedAmount>
              </IssueDetail>
            </IssueContentInfo>
          </IssueContent>
        </IssueListItem>
      ),
    )}
  </IssuesList>
);

OrganizationIssuesTab.propTypes = {
  dispatchOpenModal: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issues: T.array,
};

export default OrganizationIssuesTab;
