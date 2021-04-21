import React, { useState } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  EmptyPreferredLanguagesComponent,
  PreferredLanguagesComponent,
  PreferredLanguagesEditComponent,
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
  changePreferredLanguages,
  completedPullRequests,
  createdDate,
  dollarsEarned,
  handleClose,
  handleEdit,
  handleSubmitInputChange,
  isDisabled,
  preferredLanguages,
  rejectedPullRequests,
  setChangePreferredLanguages,
  setValue,
  value,
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
            Component={
              <ConditionalRender
                Component={PreferredLanguagesComponent}
                FallbackComponent={EmptyPreferredLanguagesComponent}
                propsToPassDown={{
                  handleEdit,
                  isDisabled,
                  preferredLanguages,
                  setChangePreferredLanguages,
                }}
                shouldRender={!isEmpty(preferredLanguages)}
              />
            }
            FallbackComponent={
              <PreferredLanguagesEditComponent
                handleClose={handleClose}
                handleSubmitInputChange={handleSubmitInputChange}
                preferredLanguages={value}
                setChangePreferredLanguages={setChangePreferredLanguages}
                setValue={setValue}
              />
            }
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
  handleEdit: T.func.isRequired,
  handleSubmitInputChange: T.func,
  isDisabled: T.bool,
  preferredLanguages: T.array,
  rejectedPullRequests: T.number,
  setChangePreferredLanguages: T.func,
  setValue: T.func,
  value: T.oneOfType([T.array, T.number, T.string]),
};

export default UserMetricsView;
