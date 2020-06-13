/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  FundContent,
  StyledAction,
  ActivityDate,
  ActivityContainer,
  ActivityWrapper,
  ProfileImageWrapper,
  RecentActivityContainer,
  StyledTitled,
  StyledExternalLink,
  StyledWordLink,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { activity, handleNav } = this.props;

    const activityDiv = (
      <ActivityContainer>
        {activity.map(
          ({
            fundedValue,
            action,
            path,
            date,
            activityId,
            target: { targetName, targetType },
            user: { userId, username, profilePic },
          }) => (
            <ActivityWrapper key={activityId}>
              <ActivityDate>{date}</ActivityDate>
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
          {activityDiv}
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
