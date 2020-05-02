import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import LanguageAutocomplete from 'components/LanguageAutocomplete';
import { issueDataDictionary } from 'containers/Issues/constants';
import Markdown from 'components/Markdown';
import {
  HorizontalWrapper,
  InputFormWrapper,
  StyledMarkdownWrapper,
} from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { repo, body, language, fundedAmount, name } = data;

  const handleMarkdownInput = markdown => {
    handleInputChange({
      field: 'body',
      form: 'data',
      value: markdown,
    });
  };

  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!name.error}
        helperText={name.error}
        label={issueDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'name',
            form: 'data',
            value: e.target.value,
          })
        }
        value={name.value}
      />
      <StyledMarkdownWrapper>
        {issueDataDictionary.body}
        <Markdown edit body={body.value} handleInput={handleMarkdownInput} />
      </StyledMarkdownWrapper>

      <LanguageAutocomplete
        error={!!language.error}
        helperText={language.error}
        label={issueDataDictionary.language}
        // eslint-disable-next-line no-shadow
        onChange={(e, value) =>
          handleInputChange({
            field: 'language',
            form: 'data',
            value,
          })
        }
        value={language.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!repo.error}
          helperText={repo.error}
          label={issueDataDictionary.repo}
          onChange={e =>
            handleInputChange({
              field: 'repo',
              form: 'data',
              value: e.target.value,
            })
          }
          value={repo.value}
        />
        <MainTextInput
          error={!!fundedAmount.error}
          helperText={fundedAmount.error}
          label={issueDataDictionary.fundedAmount}
          onChange={e =>
            handleInputChange({
              field: 'fundedAmount',
              form: 'data',
              value: e.target.value,
            })
          }
          value={fundedAmount.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
