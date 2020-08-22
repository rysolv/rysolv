import React from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { ImageLinkWrapper } from 'components/base_ui';

import {
  Body,
  CommentContainer,
  CommentHeader,
  FlexContainer,
  ProfileImageContainer,
  UsernameLink,
} from '../styledComponents';

const CommentCard = ({
  body,
  date,
  userProfile: { alt, image, route, username },
}) => {
  const html = marked(body);
  return (
    <FlexContainer>
      <ProfileImageContainer>
        <ImageLinkWrapper alt={alt} image={image} route={route} />
      </ProfileImageContainer>
      <CommentContainer>
        <CommentHeader>
          Posted by <UsernameLink to={route}>{username}</UsernameLink>&nbsp;
          {moment(date)
            .utc()
            .fromNow()}
        </CommentHeader>
        <Body dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </FlexContainer>
  );
};

CommentCard.propTypes = {
  body: T.string.isRequired,
  date: T.oneOfType([T.number, T.string]).isRequired,
  userProfile: T.object.isRequired,
};

export default CommentCard;
