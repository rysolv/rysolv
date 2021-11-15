/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import { ConditionalRender, ImageLinkWrapper } from 'components/base_ui';
import { anonymousUserImage } from 'components/base_ui/ImageLinkWrapper/constants';
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
  StyledExternalLink,
  StyledTitle,
  StyledWordLink,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { activity } = this.props;
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
          }) => {
            const disabled = !userId;
            const profilePicToRender = profilePic || anonymousUserImage;
            const usernameToRender = username || 'anonymous';
            return (
              <ActivityWrapper key={activityId}>
                <div style={{ display: 'flex' }}>
                  <ProfileImageWrapper>
                    <ImageLinkWrapper
                      alt={usernameToRender}
                      disabled={disabled}
                      image={profilePicToRender}
                      route={`/profile/${username}`}
                    />
                  </ProfileImageWrapper>
                  <FundContent>
                    <StyledWordLink
                      disabled={disabled}
                      to={`/profile/${username}`}
                    >
                      {usernameToRender}
                    </StyledWordLink>
                    &nbsp;
                    <StyledAction>
                      {action} {targetType.toLowerCase()}
                    </StyledAction>
                    &nbsp;
                    {fundedValue
                      ? `for ${formatDollarAmount(fundedValue)} `
                      : ''}
                    <StyledExternalLink to={path}>
                      {targetName}
                    </StyledExternalLink>
                    <ActivityDate>{moment(date).fromNow()}</ActivityDate>
                  </FundContent>
                </div>
              </ActivityWrapper>
            );
          },
        )}
      </ActivityContainer>
    );

    return (
      <Fragment>
        <RecentActivityContainer>
          <StyledTitle>Recent activities</StyledTitle>
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

RecentActivityView.propTypes = { activity: T.array };

export default RecentActivityView;
