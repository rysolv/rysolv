import React from 'react';

import { emptyCardMessage } from 'containers/Issues/constants';

import { MessageWrapper } from './styledComponents';

const EmptyIssue = () => <MessageWrapper>{emptyCardMessage}</MessageWrapper>;

export default EmptyIssue;
