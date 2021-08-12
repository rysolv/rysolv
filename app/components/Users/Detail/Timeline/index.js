/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { actionDictionary } from 'containers/Settings/constants';
import { formatDollarAmount, formatWordString } from 'utils/globalHelpers';

import {
  EmptyMessageContainer,
  ExternalTimelineActivity,
  HeaderWrapper,
  InternalTimelineActivity,
  StyledAction,
  StyledBaseDropDownMenu,
  StyledH3,
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
  filterValues: { users: usersFilter },
}) => {
  const filterActivity = () => {
    const filteredArray = activity.filter(({ action }) => {
      if (usersFilter === 'All' || actionDictionary[usersFilter] === action) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredActivity = filterActivity();

  const ActivityComponent = () =>
    filteredActivity.map(
      (
        {
          action,
          activityId,
          date,
          fundedValue,
          icon,
          isInternalLink,
          path,
          target: { targetName, targetType },
        },
        index,
      ) => {
        const shouldRenderFor = targetType === 'account with';
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
                      <ConditionalRender
                        Component={() => ` for `}
                        shouldRender={!shouldRenderFor}
                      />
                    </Fragment>
                  }
                  shouldRender={!!fundedValue}
                />
                <ConditionalRender
                  Component={
                    <InternalTimelineActivity to={path}>
                      {targetName}
                    </InternalTimelineActivity>
                  }
                  FallbackComponent={
                    <ExternalTimelineActivity href={path} target="_blank">
                      {targetName}
                    </ExternalTimelineActivity>
                  }
                  shouldRender={isInternalLink}
                />
              </TimelineInfo>
            </TimelineContent>
          </TimelineListItem>
        );

        if (
          index === 0 ||
          moment(date).format('YYYY/MM/DD') !==
            moment(filteredActivity[index - 1].date).format('YYYY/MM/DD')
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
          values={['All', 'Commented', 'Earned', 'Funded', 'Submitted']}
        />
      </HeaderWrapper>
      <ConditionalRender
        Component={ActivityComponent}
        FallbackComponent={
          <EmptyMessageContainer>No recent activity.</EmptyMessageContainer>
        }
        shouldRender={filteredActivity.length > 0}
      />
    </TimelineContainer>
  );
};

UserTimelineView.propTypes = {
  activity: T.array,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default UserTimelineView;
