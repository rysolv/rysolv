import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;

  ${mobile} {
    margin-right: 0;
  }
`;
