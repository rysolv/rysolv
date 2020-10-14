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
  InfoItemTitle,
  InfoItemWrapper,
  PostingInfoWrapper,
  StyledLanguageAutocomplete,
  StyledMarkdown,
  UsernameLink,
} from './styledComponents';

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
  typeChange,
  userProfile: { route, username },
}) => {
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

  return (
    <Fragment>
      <PostingInfoWrapper>
        <div>
          Opened by <UsernameLink to={route}>{username}</UsernameLink> on&nbsp;
          {moment(date)
            .utc()
            .format('M/D/YYYY')}
        </div>
        <ExternalLinkWrapper href={repo} target="_blank">
          <Icon>{GithubIcon}</Icon> View on Github
        </ExternalLinkWrapper>
      </PostingInfoWrapper>
      <CommentWrapper>
        <InfoItemWrapper>
          <InfoItemTitle>Languages:</InfoItemTitle>
          <ConditionalRender
            Component={LanguagesComponent}
            FallbackComponent={EditLanguagesComponent}
            shouldRender={!displayEditView}
          />
        </InfoItemWrapper>
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
  typeChange: T.string,
  userProfile: T.object,
};

export default IssueDetailBody;
