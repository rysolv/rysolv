import styled from 'styled-components';

import { markdownHeader, defaultFontSize } from 'defaultStyleHelper';

import { SecondaryButton } from '../base_ui';

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
    background-color: ${markdownHeader} !important;
    color: white;
    * {
      background-color: ${markdownHeader};
    }
  }

  .editor-toolbar {
    opacity: 1 !important;
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

export const StyledSecondaryButton = styled(SecondaryButton)`
  width: auto;
`;

export const EditContainer = styled.div`
  & :focus-within {
    .CodeMirror-wrap,
    .editor-toolbar {
      border-color: #78909c;
    }
  }

  * {
    width: auto;
  }

  & .editor-preview {
    * {
      width: 100%;
    }
  }
`;
