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
      action,
      activityId,
      date,
      fundedValue,
      icon,
      path,
      target: { targetType, targetName },
      user: { username },
    } = el;

    const TimelineListItemComponent = (
      <TimelineListItem key={activityId}>
        <TimelineDividerContainer>
          <TimelineVerticalDivider />
          {icon}
        </TimelineDividerContainer>
        <TimelineContent>
          <TimelineType>
            {username} {action} {targetType}
          </TimelineType>
          <TimelineInfo>
            <ConditionalRender
              Component={
                <Fragment>
                  <TimelineDollar>
                    {formatDollarAmount(fundedValue)}
                  </TimelineDollar>
                  for &nbsp;
                </Fragment>
              }
              shouldRender={!!fundedValue}
            />
            <TimelineActivity onClick={() => handleNav(path)}>
              {targetName}
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
