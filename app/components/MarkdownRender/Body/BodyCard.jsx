import React from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import marked from 'marked';

import { Body, IssueBodyContainer } from '../styledComponents';

const BodyCard = ({ body, ...restProps }) => {
  const html = marked(body);
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <IssueBodyContainer {...restProps}>
      <Body dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    </IssueBodyContainer>
  );
};

BodyCard.propTypes = { body: T.string.isRequired };

export default BodyCard;
