import React, { useState } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ActivityContainer,
  DetailListItem,
  DetailsPanel,
  DetailsPanelWrapper,
  Divider,
  RankingContainer,
  StyledUserBarTitle,
  UserDetails,
  UserMetricsContainer,
} from './styledComponents';

const UserMetricsView = ({
  activePullRequests,
  completedPullRequests,
  createdDate,
  dollarsEarned,
  preferredLanguages,
  rejectedPullRequests,
}) => {
  const [detailView, setDetailView] = useState(false);
  const hasNoDecimals = true;

  const DetailPullRequestsComponent = (
    <DetailsPanelWrapper>
      <DetailListItem>
        –&nbsp;<b>{activePullRequests}</b>&nbsp;Active
      </DetailListItem>
      <DetailListItem>
        –&nbsp;<b>{completedPullRequests}</b>&nbsp;Completed
      </DetailListItem>
      <DetailListItem>
        –&nbsp;<b>{rejectedPullRequests}</b>&nbsp;Rejected
      </DetailListItem>
    </DetailsPanelWrapper>
  );

  return (
    <UserMetricsContainer>
      <RankingContainer>
        <div>
          <StyledUserBarTitle>Ranking</StyledUserBarTitle>
          <Divider />
        </div>
        <UserDetails>
          <DetailListItem>
            <b>
              {activePullRequests +
                completedPullRequests +
                rejectedPullRequests}
            </b>
            &nbsp;
            {'Total Pull Requests'}&nbsp;
            <DetailsPanel onClick={() => setDetailView(!detailView)}>
              (Details)
            </DetailsPanel>
          </DetailListItem>
          <ConditionalRender
            Component={DetailPullRequestsComponent}
            shouldRender={detailView}
          />
          <DetailListItem>
            <b>{formatDollarAmount(dollarsEarned, hasNoDecimals)}</b>
            &nbsp;Earned
          </DetailListItem>
          <DetailListItem>
            {preferredLanguages.map(language => (
              <LanguageWrapper
                key={`list-item-${language}`}
                language={language}
              />
            ))}
          </DetailListItem>
        </UserDetails>
      </RankingContainer>
      <ActivityContainer>
        <div>
          <StyledUserBarTitle>Activity</StyledUserBarTitle>
          <Divider />
        </div>
        <DetailListItem>Joined {moment(createdDate).fromNow()}</DetailListItem>
      </ActivityContainer>
    </UserMetricsContainer>
  );
};

UserMetricsView.propTypes = {
  activePullRequests: T.number,
  completedPullRequests: T.number,
  createdDate: T.string,
  dollarsEarned: T.number,
  preferredLanguages: T.array,
  rejectedPullRequests: T.number,
};

export default UserMetricsView;
