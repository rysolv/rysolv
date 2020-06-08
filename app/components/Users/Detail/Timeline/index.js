/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  HeaderWrapper,
  StyledBaseDropDownMenu,
  StyledFundedIcon,
  StyledH3,
  TimelineActivity,
  TimelineContainer,
  TimelineContent,
  TimelineDividerContainer,
  TimelineDollar,
  TimelineHeader,
  TimelineHorizontalDivider,
  TimelineInfo,
  TimelineListItem,
  TimelineTitle,
  TimelineType,
  TimelineVerticalDivider,
} from './styledComponents';

const UserTimelineView = ({
  activity,
  handleInputChange,
  handleNav,
  filterValues: { users: usersFilter },
}) => {
  const activityDiv = activity.map((el, index) => {
    const {
      user: { username },
      action,
      activityId,
      icon,
      target: { targetType, targetName },
      date,
    } = el;

    const TimelineListItemComponent = (
      <TimelineListItem key={activityId}>
        <TimelineDividerContainer>
          <TimelineVerticalDivider />{' '}
          <StyledFundedIcon>{icon}</StyledFundedIcon>
        </TimelineDividerContainer>
        <TimelineContent>
          <TimelineType>
            {username} {action} {targetType} {targetName}
          </TimelineType>
          <TimelineInfo>
            <ConditionalRender
              Component={
                <Fragment>
                  <TimelineDollar>
                    {formatDollarAmount(activity.amount)}
                  </TimelineDollar>
                  &nbsp;
                </Fragment>
              }
              shouldRender={!!activity.amount}
            />
            <TimelineActivity onClick={() => handleNav('/issues/detail')}>
              {activity.issue}
            </TimelineActivity>
          </TimelineInfo>
        </TimelineContent>
      </TimelineListItem>
    );

    if (index === 0 || date !== activity[index - 1].date) {
      return (
        <Fragment key={`list-item-${index}`}>
          <TimelineHeader>
            <TimelineTitle>{moment(date).format('MMMM DD')}</TimelineTitle>
            <TimelineHorizontalDivider />
          </TimelineHeader>
          {TimelineListItemComponent}
        </Fragment>
      );
    }
    return TimelineListItemComponent;
  });

  return (
    <TimelineContainer>
      <HeaderWrapper>
        <StyledH3>All Activity</StyledH3>
        <StyledBaseDropDownMenu
          handleChange={value =>
            handleInputChange({ field: 'users', form: 'filter', value })
          }
          selectedValue={usersFilter}
          values={['All', 'Earned', 'Funded', 'Submitted', 'Withdrew']}
        />
      </HeaderWrapper>
      {activityDiv}
    </TimelineContainer>
  );
};

UserTimelineView.propTypes = {
  activity: T.array,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserTimelineView;
