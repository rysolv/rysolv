import React from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { LinkWrapper } from 'components/base_ui';
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
  userProfile: { alt, detailRoute, profilePic, username },
}) => {
  const html = marked(body);
  return (
    <FlexContainer>
      <ProfileImageContainer>
        <LinkWrapper
          alt={alt}
          detailRoute={detailRoute}
          profilePic={profilePic}
          size="4rem"
          type="image"
        />
      </ProfileImageContainer>
      <CommentContainer>
        <CommentHeader>
          Posted by{' '}
          <UsernameLink
            href={detailRoute}
            onClick={e => navHelper(e, handleNav, detailRoute)}
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
