import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const PaginationWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const Results = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  position: absolute;
  right: 0;
`;

export const StyledPagination = styled(Pagination)`
  width: 100%;

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
