import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import { ProfileImage } from 'components/base_ui';
import marked from 'marked';

import {
  ProfileContainer,
  CommentContainer,
  ProfileLine,
  CommentHeader,
  CommentBody,
} from './styledComponents';

const CommentCard = ({ body, createdDate, userProfile }) => {
  const { small, detailRoute, alt, profilePic, username } = userProfile;
  const html = marked(body);

  return (
    <div style={{ display: 'flex', margin: '1rem 0' }}>
      <ProfileContainer>
        <ProfileImage
          small={small}
          detailRoute={detailRoute}
          // handleNav={handleNav}
          alt={alt}
          profilePic={profilePic}
        />
      </ProfileContainer>
      <ProfileLine />
      <CommentContainer>
        <CommentHeader>
          Posted by <b>{username}</b> on{' '}
          {moment(createdDate).format('M/D/YYYY')}
        </CommentHeader>
        <CommentBody dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </div>
  );
};

CommentCard.propTypes = {
  body: T.string,
  createdDate: T.string,
  userProfile: T.object,
};

export default CommentCard;
