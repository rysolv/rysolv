import React, { useState } from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';
import Markdown from 'components/Markdown';

import {
  FlexContainer,
  NewCommentContainer,
  ProfileImageContainer,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from '../styledComponents';

const NewComment = ({ activeUser, handleComment, handleNav, issueId }) => {
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState(false);
  const { id, profilePic, username } = activeUser;

  const handlePreview = () => setPreview(!preview);

  const handleSubmit = () => {
    if (body.length > 0) {
      handleComment({ activeUser, body, issueId });
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
        <ProfileImage
          alt={username}
          detailRoute={`/users/detail/${id}`}
          handleNav={handleNav}
          profilePic={profilePic}
          size="4rem"
        />
      </ProfileImageContainer>
      <NewCommentContainer onKeyDown={e => handleKeydown(e)}>
        <Markdown body={body} comment handleInput={setBody} preview={preview} />
        {body.length !== 0 && (
          <StyledSecondaryButton
            label={preview ? 'Edit' : 'Preview'}
            onClick={() => handlePreview()}
          />
        )}
        <StyledPrimaryButton
          disabled={body.length < 1}
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
  handleNav: T.func.isRequired,
  issueId: T.string.isRequired,
};

export default NewComment;
