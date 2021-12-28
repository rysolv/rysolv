import React, { useState } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  EmptyPreferredLanguagesComponent,
  PreferredLanguagesComponent,
} from './PreferredLanguagesComponents';
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
  dispatchOpenModal,
  dollarsEarned,
  isDisabled,
  rejectedPullRequests,
  skills,
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
          <ConditionalRender
            Component={PreferredLanguagesComponent}
            FallbackComponent={EmptyPreferredLanguagesComponent}
            propsToPassDown={{
              dispatchOpenModal,
              isDisabled,
              skills,
            }}
            shouldRender={!isEmpty(skills)}
          />
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
  dispatchOpenModal: T.func.isRequired,
  dollarsEarned: T.number,
  isDisabled: T.bool,
  rejectedPullRequests: T.number,
  skills: T.array,
};

export default UserMetricsView;
