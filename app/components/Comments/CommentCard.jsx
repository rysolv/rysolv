import React, { Fragment } from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { ProfileImage } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';

import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  ProfileContainer,
  FlexContainer,
  ProfileLine,
  UsernameLink,
} from './styledComponents';

const CommentCard = ({
  primary,
  body,
  createdDate,
  handleNav,
  userProfile,
}) => {
  const { alt, detailRoute, profilePic, username } = userProfile;
  const html = marked(body);

  const profileView = (
    <Fragment>
      <ProfileContainer>
        <ProfileImage
          alt={alt}
          detailRoute={detailRoute}
          handleNav={handleNav}
          profilePic={profilePic}
          size="4rem"
        />
      </ProfileContainer>
      <ProfileLine />
    </Fragment>
  );

  return (
    <FlexContainer>
      {primary ? null : profileView}
      <CommentContainer primary={primary}>
        <CommentHeader primary={primary}>
          {primary ? 'Opened by' : 'Posted by'}{' '}
          <UsernameLink
            onClick={e =>
              navHelper(e, handleNav, `/admin/users/detail/${username}`)
            }
            href={`/admin/users/detail/${username}`}
          >
            {username}
          </UsernameLink>{' '}
          on {moment(createdDate).format('M/D/YYYY')}
        </CommentHeader>
        <CommentBody dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </FlexContainer>
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
