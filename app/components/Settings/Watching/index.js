import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IssueDetail,
  IssueFundedAmount,
  IssueName,
  IssueNameWrapper,
  WatchingList,
  WatchingListItem,
} from './styledComponents';
import { IconButtonContainer } from '../styledComponents';

const EditIcon = iconDictionary('edit');

export const WatchingListComponent = ({ watching, handleNav }) => (
  <WatchingList>
    {watching.map(({ fundedAmount, id, name }) => (
      <WatchingListItem key={`list-item-${id}`}>
        <IconButtonContainer>
          <IconButton icon={EditIcon} label="Unwatch" onClick={() => {}} />
        </IconButtonContainer>

        <IssueDetail>
          <IssueNameWrapper>
            <IssueName onClick={() => handleNav(`/issues/detail/${id}`)}>
              {name}
            </IssueName>
          </IssueNameWrapper>
          <IssueFundedAmount>
            {formatDollarAmount(fundedAmount)}
          </IssueFundedAmount>
        </IssueDetail>
      </WatchingListItem>
    ))}
  </WatchingList>
);

WatchingListComponent.propTypes = {
  handleNav: T.func,
  watching: T.array,
};
