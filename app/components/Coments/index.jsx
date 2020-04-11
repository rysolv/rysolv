import React, { Fragment } from 'react';
import { ConditionalRender } from 'components/base_ui';

import T from 'prop-types';
import { CommentHeader } from './styledComponents';

const Comments = ({ comments }) => {
  const hasComments = comments && comments.length > 0;

  const commentContainer = (
    <Fragment>
      <CommentHeader>Comments</CommentHeader>
      All Comments / RYSOLV / Github
    </Fragment>
  );

  return (
    <ConditionalRender
      Component={commentContainer}
      FallbackComponent={<div>No comments</div>}
      shouldRender={hasComments}
    />
  );
};

Comments.propTypes = { comments: T.array };

export default Comments;
