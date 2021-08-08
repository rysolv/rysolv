import React, { useRef, useState } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  DragDropText,
  FileMetaData,
  FilePreviewContainer,
  FileUploadContainer,
  FormField,
  ImagePreview,
  InputLabel,
  PreviewContainer,
  PreviewList,
  RemoveFileIcon,
  StyledPrimaryButton,
} from './styledComponents';

const CloseIcon = iconDictionary('close');

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = nestedObj =>
  Object.keys(nestedObj).map(key => nestedObj[key]);

const convertBytesToKB = bytes => Math.round(bytes / KILO_BYTES_PER_BYTE);

const DragAndDrop = ({
  handleUpdateFiles,
  label,
  maxFileSizeInBytes,
  multiple,
  value,
  ...restProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState(value);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = newFiles => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!restProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFiles = newFiles => {
    const filesAsArray = convertNestedObjectToArray(newFiles);
    handleUpdateFiles(filesAsArray);
  };

  const handleNewFileUpload = e => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFiles(updatedFiles);
    }
  };

  const removeFile = fileName => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFiles({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <StyledPrimaryButton
          label={`Upload ${restProps.multiple ? 'files' : 'a file'}`}
          onClick={handleUploadBtnClick}
        />
        <FormField
          onChange={handleNewFileUpload}
          ref={fileInputField}
          title=""
          type="file"
          value=""
          {...restProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            const file = files[fileName];
            const isImageFile = file.type.split('/')[0] === 'image';
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      alt={`file preview ${index}`}
                      src={URL.createObjectURL(file)}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon onClick={() => removeFile(fileName)}>
                        {CloseIcon}
                      </RemoveFileIcon>
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

DragAndDrop.defaultProps = {
  maxFileSizeInBytes: DEFAULT_MAX_FILE_SIZE_IN_BYTES,
};

DragAndDrop.propTypes = {
  handleUpdateFiles: T.func.isRequired,
  label: T.string.isRequired,
  maxFileSizeInBytes: T.number,
  multiple: T.bool.isRequired,
  value: T.array.isRequired,
};

export default DragAndDrop;
