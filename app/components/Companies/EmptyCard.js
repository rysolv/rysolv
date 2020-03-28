import React from 'react';

import { emptyCardMessage } from 'containers/Companies/constants';

import { MessageWrapper } from './styledComponents';

const EmptyCard = () => <MessageWrapper>{emptyCardMessage}</MessageWrapper>;

export default EmptyCard;
