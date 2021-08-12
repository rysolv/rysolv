import React from 'react';
import T from 'prop-types';

import { emptyCardMessage } from 'containers/Issues/constants';

import { MessageWrapper } from './styledComponents';

const EmptyCard = ({ height }) => (
  <MessageWrapper height={height}>{emptyCardMessage}</MessageWrapper>
);

EmptyCard.propTypes = { height: T.number.isRequired };

export default EmptyCard;
