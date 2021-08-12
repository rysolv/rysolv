import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import { BodyCard } from 'components/MarkdownRender';
import iconDictionary from 'utils/iconDictionary';

import {
  CommentWrapper,
  ExternalLinkWrapper,
  Icon,
  InfoItemContainer,
  InfoItemTitle,
  InfoItemWrapper,
  PostingInfoWrapper,
  StyledLanguageAutocomplete,
  StyledMarkdown,
  UsernameLink,
} from './styledComponents';
import { issueTags, tagColors } from '../constants';
import { TagWrapper } from '../styledComponents';

const GithubIcon = iconDictionary('github');

const IssueDetailBody = ({
  body,
  bodyChange,
  date,
  displayEditView,
  language,
  languageChange,
  repo,
  setBodyChange,
  setLanguageChange,
  setTypeChange,
  type,
  typeChange,
  userProfile: { route, username },
}) => {
  const colorIndex = issueTags.indexOf(type);

  const EditIssueBodyComponent = (
    <StyledMarkdown edit body={bodyChange} handleInput={setBodyChange} />
  );

  const EditLanguagesComponent = (
    <StyledLanguageAutocomplete
      onChange={(e, value) =>
        setLanguageChange(() => value.map(el => el.value))
      }
      value={languageChange.map(el => ({
        value: el,
      }))}
    />
  );

  const LanguagesComponent = (
    <Fragment>
      {language.map(el => (
        <LanguageWrapper key={`${el}`} language={el} />
      ))}
    </Fragment>
  );

  const EditTypeComponent = (
    <InfoItemWrapper>
      <InfoItemTitle>Type:</InfoItemTitle>
      <StyledLanguageAutocomplete
        multiple={false}
        onChange={(e, { value }) => setTypeChange(value)}
        type="type"
        value={{ value: typeChange }}
      />
    </InfoItemWrapper>
  );

  const isUserDeleted = username === '[deleted]';

  return (
    <Fragment>
      <PostingInfoWrapper>
        <div>
          Opened by&nbsp;
          <UsernameLink isUserDeleted={isUserDeleted} to={route}>
            {username}
          </UsernameLink>
          &nbsp;on&nbsp;
          {moment(date)
            .utc()
            .format('M/D/YYYY')}
        </div>
        <ExternalLinkWrapper href={repo} target="_blank">
          <Icon>{GithubIcon}</Icon> View on Github
        </ExternalLinkWrapper>
      </PostingInfoWrapper>
      <CommentWrapper>
        <InfoItemContainer>
          <InfoItemWrapper>
            <InfoItemTitle>Languages:</InfoItemTitle>
            <ConditionalRender
              Component={LanguagesComponent}
              FallbackComponent={EditLanguagesComponent}
              shouldRender={!displayEditView}
            />
          </InfoItemWrapper>
          <InfoItemWrapper>
            <InfoItemTitle>Tags:</InfoItemTitle>
            <TagWrapper tagColor={tagColors[colorIndex]}>{type}</TagWrapper>
          </InfoItemWrapper>
        </InfoItemContainer>
        <ConditionalRender
          Component={EditTypeComponent}
          shouldRender={displayEditView}
        />
        <ConditionalRender
          Component={BodyCard}
          FallbackComponent={EditIssueBodyComponent}
          propsToPassDown={{ body }}
          shouldRender={!displayEditView}
        />
      </CommentWrapper>
    </Fragment>
  );
};

IssueDetailBody.propTypes = {
  body: T.string,
  bodyChange: T.string,
  date: T.string,
  displayEditView: T.bool,
  language: T.array,
  languageChange: T.array,
  repo: T.string,
  setBodyChange: T.func,
  setLanguageChange: T.func,
  setTypeChange: T.func,
  type: T.string,
  typeChange: T.string,
  userProfile: T.object,
};

export default IssueDetailBody;
