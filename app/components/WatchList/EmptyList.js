import React from 'react';
import T from 'prop-types';

import { emptyListMessageDictionary } from './constants';
import {
  EmptyWatchListItem,
  EmptyWatchListMessage,
  WatchList,
} from './styledComponents';

const EmptyList = ({ type }) => (
  <WatchList>
    <EmptyWatchListItem>
      <EmptyWatchListMessage>
        {emptyListMessageDictionary[type]}
      </EmptyWatchListMessage>
    </EmptyWatchListItem>
  </WatchList>
);

EmptyList.propTypes = { type: T.string.isRequired };

export default EmptyList;
