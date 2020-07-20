import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import LanguageAutocomplete from 'components/LanguageAutocomplete';
import Markdown from 'components/Markdown';
import { issueDataDictionary } from 'containers/Issues/constants';

import { InputFormWrapper, StyledMarkdownWrapper } from './styledComponents';

const ManualForm = ({ issueData, handleInputChange }) => {
  const { issueBody, issueUrl, issueLanguages, issueName } = issueData;

  const handleMarkdownInput = markdown => {
    handleInputChange({
      field: 'issueBody',
      form: 'issueData',
      value: markdown,
    });
  };
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!issueName.error}
        helperText={issueName.error}
        label={issueDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'issueName',
            form: 'issueData',
            value: e.target.value,
          })
        }
        value={issueName.value}
      />
      <StyledMarkdownWrapper>
        {issueDataDictionary.issueBody}
        <Markdown
          edit
          body={issueBody.value}
          handleInput={handleMarkdownInput}
        />
      </StyledMarkdownWrapper>

      <MainTextInput
        error={!!issueUrl.error}
        helperText={issueUrl.error}
        label={issueDataDictionary.issueUrl}
        onChange={e =>
          handleInputChange({
            field: 'issueUrl',
            form: 'issueData',
            value: e.target.value,
          })
        }
        value={issueUrl.value}
      />

      <LanguageAutocomplete
        error={!!issueLanguages.error}
        helperText={issueLanguages.error}
        label={issueDataDictionary.languages}
        onChange={(e, value) =>
          handleInputChange({
            field: 'issueLanguages',
            form: 'issueData',
            value,
          })
        }
        value={issueLanguages.value.map(el => ({
          value: el,
        }))}
      />
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  issueData: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
