import React, { useState } from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';
import Markdown from 'components/Markdown';

import {
  FlexContainer,
  NewCommentContainer,
  ProfileImageContainer,
  StyledPrimaryButton,
} from './styledComponents';

const NewComment = ({ activeUser, handleNav, handleComment, issueId }) => {
  const { id, profilePic, username } = activeUser;
  const [body, setBody] = useState('');

  const handleClick = () => {
    handleComment({ activeUser, body, issueId });
    setBody('');
  };

  return (
    <FlexContainer>
      <ProfileImageContainer style={{ marginRight: '1rem' }}>
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
          disabled={!(body.length !== 0)}
          label="Comment"
          onClick={() => handleClick()}
        />
      </NewCommentContainer>
    </FlexContainer>
  );
};

NewComment.propTypes = {
  activeUser: T.object,
  handleComment: T.func,
  handleNav: T.func,
  issueId: T.string,
};

export default NewComment;
