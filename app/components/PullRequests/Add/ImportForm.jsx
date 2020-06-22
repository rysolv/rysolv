import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';

import { BaseTextInputWithAdornment } from 'components/base_ui';
import { ImportForm } from './styledComponents';

const SearchIcon = iconDictionary('search');

const ImportPullRequest = ({
  error,
  handleImport,
  handleInputChange,
  importData,
  loading,
}) => {
  const { importUrl } = importData;

  const onChangeHandler = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'importData',
      value: e.target.value,
    });
  };
  return (
    <ImportForm>
      <p>Import Pull Reqest</p>
      <BaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        disabled={loading}
        error={!!error}
        helperText={error}
        onChange={onChangeHandler}
        onClick={handleImport}
        position="end"
        value={importUrl.value}
      />
    </ImportForm>
  );
};

ImportPullRequest.propTypes = {
  error: T.string,
  handleImport: T.func,
  handleInputChange: T.func,
  importData: T.object,
  loading: T.bool,
};

export default ImportPullRequest;
