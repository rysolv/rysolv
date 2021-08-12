import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const Results = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 0 1rem 1rem;
  text-align: end;
  width: 100%;

  ${mobile} {
    padding: 0 0 1rem;
  }
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
