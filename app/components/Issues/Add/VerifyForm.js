/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { issueDataDictionary } from 'containers/Issues/constants';
import { CommentCard } from 'components/Comments';

import { DataWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const {
      data: { repo, body, language, value, name },
    } = this.props;

    return (
      <DataWrapper>
        {issueDataDictionary.name}
        {name.value}

        {issueDataDictionary.repo}
        {repo.value}

        {issueDataDictionary.body}
        {body.value}
        <CommentCard body={body.value} date={Date.now()} />

        {issueDataDictionary.language}
        {language.value}

        {issueDataDictionary.value}
        {value.value}
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { data: T.object };

export default VerifyForm;
