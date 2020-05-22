import React, { useState } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  PreferredLanguagesComponent,
  PreferredLanguagesEditComponent,
} from '../PreferredLanguagesComponents';
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
  changePreferredLanguages,
  completedPullRequests,
  createdDate,
  dollarsEarned,
  handleClose,
  handleDone,
  handleEdit,
  isDisabled,
  preferredLanguages,
  rejectedPullRequests,
  setChangePreferredLanguages,
  setValue,
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
            FallbackComponent={
              <PreferredLanguagesEditComponent
                handleClose={handleClose}
                handleDone={handleDone}
                preferredLanguages={preferredLanguages}
                setChangePreferredLanguages={setChangePreferredLanguages}
                setValue={setValue}
              />
            }
            propsToPassDown={{
              handleEdit,
              isDisabled,
              preferredLanguages,
              setChangePreferredLanguages,
            }}
            shouldRender={!changePreferredLanguages}
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
  changePreferredLanguages: T.bool,
  completedPullRequests: T.number,
  createdDate: T.string,
  dollarsEarned: T.number,
  handleClose: T.func,
  handleDone: T.func,
  handleEdit: T.func.isRequired,
  isDisabled: T.bool,
  preferredLanguages: T.array,
  rejectedPullRequests: T.number,
  setChangePreferredLanguages: T.func,
  setValue: T.func,
};

export default UserMetricsView;
