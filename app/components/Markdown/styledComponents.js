import styled from 'styled-components';

import {
  defaultFontFamily,
  defaultFontSize,
  headerColor,
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
    background-color: ${headerColor} !important;
    color: white;
    * {
      background-color: ${headerColor};
    }
  }

  .editor-toolbar {
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
    transition: min-height 0.2s;
    min-height: ${props => (props.comment ? '5rem' : '20rem')};
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
