import React, { useState } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ActivityContainer,
  DetailListItem,
  DetailsPanel,
  DetailsPanelWrapper,
  Divider,
  Language,
  OnlineIcon,
  OnlineWrapper,
  RankingContainer,
  StyledUserBarTitle,
  UserDetails,
  UserMetricsContainer,
} from './styledComponents';

const activePullRequests = 6;
const completedPullRequests = 10;
const dollarsEarned = 984;
const isOnline = true;
const modifiedDate = '2020-04-20T02:42:50Z';
const preferredLanguages = ['Javascript', 'Go'];
const rejectedPullRequests = 5;

const CircleIcon = iconDictionary('circle');

const UserMetricsView = ({ createdDate }) => {
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

  const OnlineComponent = (
    <OnlineWrapper>
      <OnlineIcon>{CircleIcon}</OnlineIcon>
      <b>Online Now</b>
    </OnlineWrapper>
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
              <Language key={`list-item-${language}`}>{language}</Language>
            ))}
          </DetailListItem>
        </UserDetails>
      </RankingContainer>
      <ActivityContainer>
        <div>
          <StyledUserBarTitle>Activity</StyledUserBarTitle>
          <Divider />
        </div>
        <DetailListItem>
          Last seen&nbsp;
          <ConditionalRender
            Component={<b>{moment(modifiedDate).fromNow()}</b>}
            FallbackComponent={OnlineComponent}
            shouldRender={!isOnline}
          />
        </DetailListItem>
        <DetailListItem>Joined {moment(createdDate).fromNow()}</DetailListItem>
      </ActivityContainer>
    </UserMetricsContainer>
  );
};

UserMetricsView.propTypes = {
  createdDate: T.string,
};

export default UserMetricsView;
