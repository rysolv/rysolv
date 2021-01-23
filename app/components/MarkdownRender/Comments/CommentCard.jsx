import React from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
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
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <FlexContainer>
      <ProfileImageContainer>
        <ImageLinkWrapper alt={alt} image={image} route={route} />
      </ProfileImageContainer>
      <CommentContainer>
        <CommentHeader>
          <span>
            Posted by&nbsp;<UsernameLink to={route}>{username}</UsernameLink>
          </span>
          &nbsp;
          {moment(date)
            .utc()
            .fromNow()}
        </CommentHeader>
        <Body dangerouslySetInnerHTML={{ __html: cleanHtml }} />
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
