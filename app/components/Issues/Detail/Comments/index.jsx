/* eslint-disable react/no-array-index-key */
import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import {
  CommentCard,
  GithubCommentCard,
  NoComment,
} from 'components/MarkdownRender';

import { StyledPaper, StyledTab, StyledTabs } from './styledComponents';
import { CommentWrapper } from '../styledComponents';

const Comments = ({ comments }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateComments = type => {
    if (comments && comments.length > 0) {
      const filteredComments = comments.filter(({ isGithubComment }) => {
        if (type === 'all') {
          return isGithubComment || !isGithubComment;
        }
        if (type === 'github') {
          return isGithubComment;
        }
        if (type === 'rysolv') {
          return !isGithubComment;
        }
        return [];
      });
      if (filteredComments.length > 0) {
        return filteredComments.map(
          (
            {
              body,
              createdDate,
              githubUrl,
              isGithubComment,
              profilePic,
              userId,
              username,
            },
            index,
          ) => {
            const user = {
              alt: username,
              image: profilePic,
              route: isGithubComment ? githubUrl : `/users/detail/${userId}`,
              username,
            };
            const CommentCardComponent = () => (
              <CommentCard body={body} date={createdDate} userProfile={user} />
            );
            const GithubCommentCardComponent = () => (
              <GithubCommentCard
                body={body}
                date={createdDate}
                userProfile={user}
              />
            );
            return (
              <ConditionalRender
                key={`${username}-${index}`}
                Component={CommentCardComponent}
                FallbackComponent={GithubCommentCardComponent}
                shouldRender={!isGithubComment}
              />
            );
          },
        );
      }
      return <NoComment />;
    }
    return <NoComment />;
  };

  const ComponentToRender = {
    0: generateComments('all'),
    1: generateComments('github'),
    2: generateComments('rysolv'),
  };
  return (
    <Fragment>
      <StyledPaper>
        <StyledTabs
          classes={{ indicator: 'indicator' }}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          <StyledTab classes={{ selected: 'selected' }} label="All" />
          <StyledTab classes={{ selected: 'selected' }} label="Github" />
          <StyledTab classes={{ selected: 'selected' }} label="Rysolv" />
        </StyledTabs>
      </StyledPaper>
      <CommentWrapper>{ComponentToRender[value]}</CommentWrapper>
    </Fragment>
  );
};

Comments.propTypes = { comments: T.array.isRequired };

export default Comments;
