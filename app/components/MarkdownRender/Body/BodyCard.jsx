import React from 'react';
import T from 'prop-types';
import marked from 'marked';

import { Body, IssueBodyContainer } from '../styledComponents';

const BodyCard = ({ body }) => {
  const html = marked(body);
  return (
    <IssueBodyContainer>
      <Body dangerouslySetInnerHTML={{ __html: html }} />
    </IssueBodyContainer>
  );
};

BodyCard.propTypes = { body: T.string.isRequired };

export default BodyCard;
