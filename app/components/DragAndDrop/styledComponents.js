import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import {
  darkBlueColor,
  defaultFontSize,
  lightGreyColor,
  whiteColor,
} from 'defaultStyleHelper';

export const DragDropText = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;

export const FileMetaData = styled.div`
  background-color: rgba(5, 5, 5, 0.55);
  border-radius: 0.6rem;
  bottom: 0;
  color: white;
  display: ${({ isImageFile }) => (isImageFile ? 'none' : 'flex')};
  flex-direction: column;
  font-weight: bold;
  left: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;

  aside {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
`;

export const FilePreviewContainer = styled.article`
  margin-bottom: 3.5rem;

  span {
    font-size: ${defaultFontSize};
  }
`;

export const FileUploadContainer = styled.section`
  align-items: center;
  background-color: white;
  border-radius: 0.6rem;
  border: 0.2rem dotted ${lightGreyColor};
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0 1.5rem;
  padding: 3.5rem 2rem;
  position: relative;
`;

export const FormField = styled.input`
  border: none;
  bottom: 0;
  display: block;
  font-size: 1.8rem;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  text-transform: none;
  top: 0;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 0.6rem;
  height: 100%;
  width: 100%;
`;

export const InputLabel = styled.label`
  color: black;
  font-size: 1.3rem;
  left: 0;
  position: absolute;
  top: -2.1rem;
`;

export const PreviewContainer = styled.section`
  border-radius: 0.6rem;
  box-sizing: border-box;
  height: 120px;
  padding: 0.25rem;
  width: 20%;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media (max-width: 750px) {
    width: 25%;
  }

  @media (max-width: 500px) {
    width: 50%;
  }

  @media (max-width: 400px) {
    padding: 0 0 0.4em;
    width: 100%;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const RemoveFileIcon = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  border: 0.2rem solid ${darkBlueColor};
  bottom: -1rem;
  color: ${darkBlueColor};
  display: flex;
  height: 4rem;
  justify-content: center;
  position: absolute;
  right: -1rem;
  width: 4rem;

  &:hover {
    background-color: white;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-items: center;
  background-color: ${darkBlueColor};
  border-radius: 0.8rem;
  border: 0.2rem solid ${darkBlueColor};
  color: ${whiteColor};
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 1rem auto;
  min-width: 20rem;
  text-transform: initial;
  z-index: 1;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;
