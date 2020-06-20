/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount, formatWordString } from 'utils/globalHelpers';

import {
  EmptyMessageContainer,
  HeaderWrapper,
  StyledAction,
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
  const ActivityComponent = activity.map(
    (
      {
        action,
        activityId,
        date,
        fundedValue,
        icon,
        path,
        target: { targetType, targetName },
      },
      index,
    ) => {
      const TimelineListItemComponent = (
        <TimelineListItem key={activityId}>
          <TimelineDividerContainer>
            <TimelineVerticalDivider />
            {icon}
          </TimelineDividerContainer>
          <TimelineContent>
            <TimelineType>
              <StyledAction>{formatWordString(action)}</StyledAction>&nbsp;
              {targetType}
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

      if (
        index === 0 ||
        moment(date).format('YYYY/MM/DD') !==
          moment(activity[index - 1].date).format('YYYY/MM/DD')
      ) {
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
    },
  );

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
      <ConditionalRender
        Component={ActivityComponent}
        FallbackComponent={
          <EmptyMessageContainer>No recent activity.</EmptyMessageContainer>
        }
        shouldRender={activity.length > 0}
      />
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
