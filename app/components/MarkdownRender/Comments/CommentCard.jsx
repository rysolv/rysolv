import React from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { ImageLinkWrapper } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';

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
  handleNav,
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
          Posted by{' '}
          <UsernameLink
            href={route}
            onClick={e => navHelper(e, handleNav, route)}
          >
            {username}
          </UsernameLink>{' '}
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
  handleNav: T.func.isRequired,
  userProfile: T.object.isRequired,
};

export default CommentCard;
