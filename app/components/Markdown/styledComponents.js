import styled from 'styled-components';
import { SecondaryButton } from '../base_ui';

export const MarkdownContainer = styled.div`
  width: 100%;
  margin: 0;
  & .CodeMirror-wrap:focus-within {
    border-color: #78909c;
    -webkit-box-shadow: 0px 0px 5px 0px #78909c;
    -moz-box-shadow: 0px 0px 5px 0px #78909c;
    box-shadow: 0px 0px 5px 0px #78909c;
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
