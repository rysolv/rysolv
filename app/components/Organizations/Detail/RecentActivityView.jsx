/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import { ConditionalRender, ProfileImage } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ActivityContainer,
  ActivityDate,
  ActivityWrapper,
  EmptyMessageComponent,
  FundContent,
  ProfileImageWrapper,
  RecentActivityContainer,
  StyledAction,
  StyledTitled,
  StyledExternalLink,
  StyledWordLink,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { activity, handleNav } = this.props;
    const ActivityComponent = (
      <ActivityContainer>
        {activity.map(
          ({
            action,
            activityId,
            date,
            fundedValue,
            path,
            target: { targetName, targetType },
            user: { userId, username, profilePic },
          }) => (
            <ActivityWrapper key={activityId}>
              <ActivityDate>{moment(date).fromNow()}</ActivityDate>
              <div style={{ display: 'flex' }}>
                <ProfileImageWrapper>
                  <ProfileImage
                    alt={username}
                    detailRoute={`/users/detail/${userId}`}
                    handleNav={handleNav}
                    profilePic={profilePic}
                    size="4rem"
                  />
                </ProfileImageWrapper>
                <FundContent>
                  <StyledWordLink to={`/users/detail/${userId}`}>
                    {username}
                  </StyledWordLink>
                  &nbsp;
                  <StyledAction>
                    {action} {targetType.toLowerCase()}
                  </StyledAction>
                  &nbsp;
                  <StyledExternalLink to={path}>
                    {targetName}
                  </StyledExternalLink>
                  {fundedValue ? ` for ${formatDollarAmount(fundedValue)}` : ''}
                </FundContent>
              </div>
            </ActivityWrapper>
          ),
        )}
      </ActivityContainer>
    );

    return (
      <Fragment>
        <RecentActivityContainer>
          <StyledTitled>Recent activities</StyledTitled>
          <ConditionalRender
            Component={ActivityComponent}
            FallbackComponent={
              <EmptyMessageComponent>No recent activity.</EmptyMessageComponent>
            }
            shouldRender={activity.length > 0}
          />
        </RecentActivityContainer>
      </Fragment>
    );
  }
}

RecentActivityView.propTypes = {
  activity: T.array,
  handleNav: T.func.isRequired,
};

export default RecentActivityView;
