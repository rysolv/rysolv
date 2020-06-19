import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';

import { BaseTextInputWithAdornment } from 'components/base_ui';
import { ImportForm } from './styledComponents';

const SearchIcon = iconDictionary('search');

const ImportPullRequest = ({
  handleInputChange,
  handleImport,
  importData,
  error,
  importLoading,
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
        disabled={importLoading}
        adornmentComponent={SearchIcon}
        name="url"
        onClick={handleImport}
        onChange={onChangeHandler}
        position="end"
        value={importUrl.value}
      />
      <p style={{ color: 'red' }}>{error}</p>
    </ImportForm>
  );
};

ImportPullRequest.propTypes = {
  handleInputChange: T.func,
  handleImport: T.func,
  importData: T.object,
  importLoading: T.bool,
  error: T.string,
};

export default ImportPullRequest;
