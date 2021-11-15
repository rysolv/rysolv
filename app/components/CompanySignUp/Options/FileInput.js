import React from 'react';
import T from 'prop-types';

import { getBase64 } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  FileInputContainer,
  PreviewDisplay,
  StyledBaseFileInput,
} from './styledComponents';

const PhotoCameraIcon = iconDictionary('photoCamera');

const FileInputOption = ({ handleChangeInput, value }) => {
  const handleUploadLogo = async e => {
    const { files } = e.target;
    const formattedUserImage = await getBase64(files[0]);
    handleChangeInput(formattedUserImage);
  };

  return (
    <FileInputContainer>
      <PreviewDisplay src={value} />
      <StyledBaseFileInput
        $hasInput={!!value}
        accept="image/png, image/jpeg"
        id="logoFileInput"
        onChange={e => handleUploadLogo(e)}
      >
        {PhotoCameraIcon}
      </StyledBaseFileInput>
    </FileInputContainer>
  );
};

FileInputOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  value: T.string,
};

export default FileInputOption;
