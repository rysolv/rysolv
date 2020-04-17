import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';
import { ProfileImage } from 'components/base_ui';
import marked from 'marked';

import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  ProfileContainer,
  ProfileLine,
} from './styledComponents';

const CommentCard = ({
  primary,
  body,
  createdDate,
  handleNav,
  userProfile,
}) => {
  const { alt, detailRoute, profilePic, small, username } = userProfile;
  const html = marked(body);

  const profileView = (
    <Fragment>
      <ProfileContainer>
        <ProfileImage
          alt={alt}
          detailRoute={detailRoute}
          handleNav={handleNav}
          profilePic={profilePic}
          small={small}
        />
      </ProfileContainer>
      <ProfileLine />
    </Fragment>
  );

  return (
    <div style={{ display: 'flex', margin: '1rem 0' }}>
      {primary ? null : profileView}
      <CommentContainer primary={primary}>
        <CommentHeader primary={primary}>
          {primary ? 'Opened by' : 'Posted by'} <b>{username}</b> on{' '}
          {moment(createdDate).format('M/D/YYYY')}
        </CommentHeader>
        <CommentBody dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </div>
  );
};

CommentCard.propTypes = {
  body: T.string,
  primary: T.bool,
  createdDate: T.string,
  handleNav: T.func,
  userProfile: T.object,
};

export default CommentCard;
