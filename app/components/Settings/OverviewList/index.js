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
import { TimelineActivity } from '../Timeline/styledComponents';

const AttemptingIcon = iconDictionary('attempt');
const WatchingIcon = iconDictionary('monocle');

export const EmptyOverviewListComponent = ({ handleNav, type }) => (
  <OverviewList>
    <EmptyOverviewListItem>
      <EmptyOverviewListDetail>
        Not {type} any issues.{' '}
        <TimelineActivity onClick={() => handleNav('/issues')}>
          Browse issues
        </TimelineActivity>{' '}
        to add to your {type} list.
      </EmptyOverviewListDetail>
    </EmptyOverviewListItem>
  </OverviewList>
);

export const OverviewListComponent = ({ handleNav, list, type }) => {
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
  return (
    <OverviewList>
      {list.map(({ fundedAmount, id, name }) => (
        <OverviewListItem key={`list-item-${id}`}>
          <IconButtonContainer>
            <IconButton icon={icon} label={label} onClick={() => {}} />
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

EmptyOverviewListComponent.propTypes = {
  handleNav: T.func,
  type: T.string,
};

OverviewListComponent.propTypes = {
  handleNav: T.func,
  list: T.array,
  type: T.string,
};
