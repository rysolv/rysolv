import styled from 'styled-components';

import {
  defaultFontFamily,
  defaultFontSize,
  candidateGreyColor,
  textColor,
} from 'defaultStyleHelper';

export const MarkdownContainer = styled.div`
  font-size: ${defaultFontSize};
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
    border-left: 0.1rem solid #ddd;
    border-radius: 0;
    border-right: 0.1rem solid #ddd;
    border-top: 0.1rem solid #ddd;
    opacity: 1 !important;

    ::after {
      content: none;
    }

    ::before {
      content: none;
    }
  }

  .CodeMirror,
  .CodeMirror-scroll {
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
      border-color: #78909c;
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
