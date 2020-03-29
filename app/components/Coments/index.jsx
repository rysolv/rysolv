import React, { Fragment } from 'react';
import { ConditionalRender } from 'components/base_ui';

import T from 'prop-types';
import { CommentHeader } from './styledComponents';

const Comments = ({ comments }) => {
  console.log(comments);

  const hasComments = comments && comments.length > 0;

  const commentContainer = (
    <Fragment>
      <CommentHeader>Comments</CommentHeader>
      All Comments / RYSOLV / Github
      {/* <IssueDetailOverview>
        <IssueDetailHeader>Paul House</IssueDetailHeader>
        <IssueDetailBody>
          Please report the NvidiaBlackmagic driver version (Desktop only shows
          Mode as in resolution and framerate for me (BMD Desktop video 11.4
          Ubuntu 19.04/kernel 5.0.0-37)?
        </IssueDetailBody>
      </IssueDetailOverview> */}
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
