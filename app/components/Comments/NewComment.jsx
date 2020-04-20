import React, { Fragment } from 'react';
import { StyledPrimaryButton } from './styledComponents';
import Markdown from '../Markdown';

const NewComment = () => (
  <Fragment>
    <Markdown
      comment
      edit
      handleInput={() => {
        console.log('yo');
      }}
    />
    <StyledPrimaryButton
      disabled={false}
      label="Comment"
      // onClick={() => handleIncrementStep({ step: 3, view: 'addIssue' })}
    />
  </Fragment>
);

export default NewComment;
