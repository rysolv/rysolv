import styled from 'styled-components';
import { SecondaryButton } from '../base_ui';

export const MarkdownContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  width: auto;
`;

export const HTMLContainer = styled.div`
  border: 1px solid gray;
  padding: 1rem;
  background-color: white;
  margin: 2rem 0 0 0;
  display: ${props => (props.view ? 'block' : 'none')};
  * {
    width: 100%;
  }
`;

export const EditContainer = styled.div`
  display: ${props => (!props.view ? 'block' : 'none')};
  * {
    width: auto;
  }

  & .editor-preview {
    * {
      width: 100%;
    }
  }
`;
