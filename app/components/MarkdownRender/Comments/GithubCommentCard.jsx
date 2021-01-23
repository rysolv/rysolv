import React from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { ImageExternalLinkWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  Body,
  CommentContainer,
  CommentHeader,
  FlexContainer,
  GithubIconWrapper,
  ProfileImageContainer,
  UsernameExternalLink,
} from '../styledComponents';

const githubIcon = iconDictionary('github');

const GithubCommentCard = ({
  body,
  date,
  userProfile: { alt, image, route, username },
}) => {
  const html = marked(body);
  return (
    <FlexContainer>
      <ProfileImageContainer>
        <ImageExternalLinkWrapper alt={alt} image={image} route={route} />
      </ProfileImageContainer>
      <CommentContainer>
        <CommentHeader>
          <div>
            <GithubIconWrapper>
              {githubIcon}&nbsp;Posted on Github by&nbsp;
            </GithubIconWrapper>
            <span>
              <UsernameExternalLink href={route} target="_blank">
                {username}
              </UsernameExternalLink>
            </span>
          </div>
          &nbsp;
          <div>
            {moment(date)
              .utc()
              .fromNow()}
          </div>
        </CommentHeader>
        <Body dangerouslySetInnerHTML={{ __html: html }} />
      </CommentContainer>
    </FlexContainer>
  );
};

GithubCommentCard.propTypes = {
  body: T.string.isRequired,
  date: T.oneOfType([T.number, T.string]).isRequired,
  userProfile: T.object.isRequired,
};

export default GithubCommentCard;
