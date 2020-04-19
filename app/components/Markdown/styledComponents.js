import styled from 'styled-components';
import { markdownHeader } from 'defaultStyleHelper';
import { SecondaryButton } from '../base_ui';

export const MarkdownContainer = styled.div`
  width: 100%;
  margin: 0;

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
    min-height: ${props => (props.comment ? '5rem' : '20rem')}};
  }

  &:focus-within {
    .CodeMirror,
    .CodeMirror-scroll {
      min-height: ${props => (props.comment ? '5.5rem' : '20rem')}};
    }
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  width: auto;
`;

export const HTMLContainer = styled.div`
  padding: 0;
  background-color: white;
  display: ${props => (props.view ? 'none' : 'block')};
  * {
    font-family: inherit;
    color: inherit;
    width: 100%;
  }
`;

export const EditContainer = styled.div`
  & :focus-within {
    .CodeMirror-wrap,
    .editor-toolbar {
      border-color: #78909c;
    }
  }

  display: ${props => (props.view ? 'block' : 'none')};
  * {
    width: auto;
  }

  & .editor-preview {
    * {
      width: 100%;
    }
  }
`;
