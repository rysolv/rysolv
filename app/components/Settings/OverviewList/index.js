import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyOverviewListDetail,
  EmptyOverviewListItem,
  IssueFundedAmount,
  IssueName,
  IssueNameWrapper,
  OverviewList,
  OverviewListDetail,
  OverviewListItem,
} from './styledComponents';
import { IconButtonContainer } from '../styledComponents';
import { InternalTimelineActivity } from '../Timeline/styledComponents';

const AttemptingIcon = iconDictionary('attempt');
const WatchingIcon = iconDictionary('monocle');

export const EmptyOverviewListComponent = ({ type }) => (
  <OverviewList>
    <EmptyOverviewListItem>
      <EmptyOverviewListDetail>
        Not {type} any issues.{' '}
        <InternalTimelineActivity to="/issues">
          Browse issues
        </InternalTimelineActivity>{' '}
        to add to your {type} list.
      </EmptyOverviewListDetail>
    </EmptyOverviewListItem>
  </OverviewList>
);

export const OverviewListComponent = ({
  handleNav,
  handleRemoveAttempting,
  handleRemoveWatching,
  list,
  type,
}) => {
  const listIconDictionary = {
    attempting: {
      icon: AttemptingIcon,
      label: 'Unattempt',
    },
    watching: {
      icon: WatchingIcon,
      label: 'Unwatch',
    },
  };
  const { icon, label } = listIconDictionary[type];
  const handleRemove = ({ id: issueId, column }) => {
    if (column === 'watching') {
      handleRemoveWatching({
        issueId,
      });
    } else {
      handleRemoveAttempting({
        issueId,
      });
    }
  };
  return (
    <OverviewList>
      {list.map(({ fundedAmount, id, name }) => (
        <OverviewListItem key={`list-item-${id}`}>
          <IconButtonContainer>
            <IconButton
              icon={icon}
              label={label}
              onClick={() =>
                handleRemove({
                  id,
                  column: type,
                })
              }
            />
          </IconButtonContainer>
          <OverviewListDetail>
            <IssueNameWrapper>
              <IssueName onClick={() => handleNav(`/issues/detail/${id}`)}>
                {name}
              </IssueName>
            </IssueNameWrapper>
            <IssueFundedAmount>
              {formatDollarAmount(fundedAmount)}
            </IssueFundedAmount>
          </OverviewListDetail>
        </OverviewListItem>
      ))}
    </OverviewList>
  );
};

EmptyOverviewListComponent.propTypes = { type: T.string };

OverviewListComponent.propTypes = {
  handleNav: T.func,
  handleRemoveAttempting: T.func,
  handleRemoveWatching: T.func,
  list: T.array,
  type: T.string,
};
