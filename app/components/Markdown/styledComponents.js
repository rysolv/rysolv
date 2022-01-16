import styled from 'styled-components';

import {
  defaultFontFamily,
  candidateGreyColor,
  textColor,
} from 'defaultStyleHelper';

export const MarkdownContainer = styled.div`
  font-size: 1.6rem;
  margin: 0;
  text-align: left;
  width: 100%;

  .editor-toolbar,
  a:before,
  a:active,
  .fa,
  .fa:hover {
    background-color: ${candidateGreyColor} !important;
    color: ${textColor};

    * {
      background-color: ${candidateGreyColor};
    }
  }

  .editor-toolbar {
    align-items: center;
    border-left: 0.1rem solid ${candidateGreyColor};
    border-right: 0.1rem solid ${candidateGreyColor};
    border-top-left-radius: 0.7rem;
    border-top-right-radius: 0.7rem;
    border-top: 0.1rem solid ${candidateGreyColor};
    display: flex;
    height: 4.9rem;
    opacity: 1 !important;

    ::after {
      content: none;
    }

    ::before {
      content: none;
    }
  }

  .CodeMirror {
    border: 0.2rem solid ${candidateGreyColor} !important;
  }

  .CodeMirror,
  .CodeMirror-scroll {
    border-bottom-left-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
    min-height: ${props => (props.comment ? '5rem' : '20rem')};
    transition: min-height 0.2s;
  }

  &:focus-within {
    .CodeMirror,
    .CodeMirror-scroll {
      min-height: ${props => (props.comment ? '5.5rem' : '20rem')};
    }
  }
`;

export const EditContainer = styled.div`
  & :focus-within {
    .CodeMirror-wrap,
    .editor-toolbar {
      border-color: ${candidateGreyColor};
    }
  }

  * {
    color: ${textColor};
    font-family: ${defaultFontFamily};
    width: auto;
  }

  & .editor-preview {
    * {
      width: 100%;
    }
  }
`;
