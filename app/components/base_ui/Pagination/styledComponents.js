import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledPagination = styled(Pagination)`
  .MuiPagination-ul {
    justify-content: center;
  }

  .MuiPaginationItem-icon {
    font-size: ${defaultFontSize};
  }

  .MuiPaginationItem-rounded {
    color: ${textColor};
    font-size: ${defaultFontSize};
  }
`;
