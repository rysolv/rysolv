import React, { useState } from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';
import Markdown from 'components/Markdown';

import {
  FlexContainer,
  NewCommentContainer,
  ProfileImageContainer,
  StyledPrimaryButton,
} from '../styledComponents';

const NewComment = ({ activeUser, handleNav, handleComment, issueId }) => {
  const [body, setBody] = useState('');
  const { id, profilePic, username } = activeUser;

  const handleClick = () => {
    handleComment({ activeUser, body, issueId });
    setBody('');
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
      <NewCommentContainer>
        <Markdown
          comment
          body={body}
          handleInput={setBody}
          handleEnter={handleClick}
        />
        <StyledPrimaryButton
          disabled={body.length === 0}
          label="Comment"
          onClick={() => handleClick()}
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
