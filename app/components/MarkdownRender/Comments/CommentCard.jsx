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
  FlexContainer,
  ProfileImageContainer,
  UsernameLink,
} from '../styledComponents';

const CommentCard = ({ body, date, handleNav, primary, userProfile }) => {
  const { alt, detailRoute, profilePic, username } = userProfile;
  const html = marked(body);

  const profileView = (
    <Fragment>
      <ProfileImageContainer>
        <ProfileImage
          alt={alt}
          detailRoute={detailRoute}
          handleNav={handleNav}
          profilePic={profilePic}
          size="4rem"
        />
      </ProfileImageContainer>
    </Fragment>
  );
  return (
    <FlexContainer>
      {primary ? null : profileView}
      <CommentContainer primary={primary}>
        <CommentHeader primary={primary}>
          {primary ? 'Opened by' : 'Posted by'}{' '}
          <UsernameLink
            onClick={e => navHelper(e, handleNav, detailRoute)}
            href={detailRoute}
          >
            {username}
          </UsernameLink>{' '}
          {moment(date)
            .utc()
            .fromNow()}
        </CommentHeader>
        <CommentBody dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </FlexContainer>
  );
};

CommentCard.propTypes = {
  body: T.string,
  date: T.oneOfType([T.number, T.string]),
  handleNav: T.func,
  primary: T.bool,
  userProfile: T.object,
};

export default CommentCard;
