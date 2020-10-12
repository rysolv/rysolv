import React, { useState } from 'react';
import T from 'prop-types';

import { ImageLinkWrapper } from 'components/base_ui';
import Markdown from 'components/Markdown';

import {
  FlexContainer,
  NewCommentContainer,
  ProfileImageContainer,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from '../styledComponents';

const NewComment = ({
  activeUser: { id, profilePic, username },
  handleComment,
  issueId,
}) => {
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState(false);

  const handlePreview = () => setPreview(!preview);

  const handleSubmit = () => {
    if (body.length > 0) {
      handleComment({ body, issueId });
      setBody('');
      setPreview(false);
    }
  };

  const handleKeydown = ({ ctrlKey, key }) => {
    if (ctrlKey && key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <FlexContainer>
      <ProfileImageContainer addMargin>
        <ImageLinkWrapper
          alt={username}
          image={profilePic}
          route={`/users/detail/${id}`}
        />
      </ProfileImageContainer>
      <NewCommentContainer onKeyDown={e => handleKeydown(e)}>
        <Markdown body={body} comment handleInput={setBody} preview={preview} />
        {body.length > 0 && (
          <StyledSecondaryButton
            label={preview ? 'Edit' : 'Preview'}
            onClick={handlePreview}
          />
        )}
        <StyledPrimaryButton
          disabled={body.length === 0}
          label="Comment"
          onClick={handleSubmit}
        />
      </NewCommentContainer>
    </FlexContainer>
  );
};

NewComment.propTypes = {
  activeUser: T.object.isRequired,
  handleComment: T.func.isRequired,
  issueId: T.string.isRequired,
};

export default NewComment;
