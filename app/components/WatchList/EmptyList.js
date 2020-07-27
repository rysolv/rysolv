import React from 'react';
import T from 'prop-types';

import { emptyListMessageDictionary } from './constants';
import {
  EmptyListItem,
  EmptyListMessage,
  ListContainer,
} from './styledComponents';

const EmptyList = ({ type }) => (
  <ListContainer>
    <EmptyListItem>
      <EmptyListMessage>{emptyListMessageDictionary[type]}</EmptyListMessage>
    </EmptyListItem>
  </ListContainer>
);

EmptyList.propTypes = { type: T.string.isRequired };

export default EmptyList;
