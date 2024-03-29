import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledModalDialog = styled(Dialog)`
  .paper {
    max-width: 50rem;

    @media (max-width: 560px) {
      width: 100%;
    }
  }
`;
